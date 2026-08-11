import AccessRecord from "../models/accessRecord.model.js";
import Vehicle from "../models/vehicle.model.js";

function serviceError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function normalizePlate(plate) {
  const compactPlate = plate.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
  if (compactPlate.length !== 6) {
    throw serviceError(400, "La patente debe contener exactamente 6 caracteres alfanumericos");
  }
  return `${compactPlate.slice(0, 2)}.${compactPlate.slice(2, 4)}.${compactPlate.slice(4)}`;
}

async function getAccessRecordById(id) {
  const record = await AccessRecord.findById(id)
    .populate("vehicle", "matricula marca modelo color")
    .populate("registeredBy", "username email")
    .populate("checkedOutBy", "username email");
  if (!record) throw serviceError(404, "Movimiento de acceso no encontrado");
  return record;
}

async function checkIn(data, operatorId) {
  const plate = normalizePlate(data.plate);
  const openRecord = await AccessRecord.findOne({ plate, status: "inside" });
  if (openRecord) throw serviceError(409, "Este vehiculo ya tiene un ingreso activo");

  let vehicleId = data.vehicle;
  if (!vehicleId) {
    const registeredVehicle = await Vehicle.findOne({ matricula: plate }).select("_id");
    vehicleId = registeredVehicle?._id;
  }

  const record = await AccessRecord.create({
    ...data,
    plate,
    vehicle: vehicleId,
    status: "inside",
    registeredBy: operatorId,
  });
  return getAccessRecordById(record._id);
}

async function checkOut(id, operatorId) {
  const record = await AccessRecord.findById(id);
  if (!record) throw serviceError(404, "Movimiento de acceso no encontrado");
  if (record.status === "closed") throw serviceError(409, "Este movimiento ya registra una salida");

  record.status = "closed";
  record.exitAt = new Date();
  record.checkedOutBy = operatorId;
  await record.save();
  return getAccessRecordById(record._id);
}

async function listAccessRecords(filters) {
  const query = {};
  if (filters.status) query.status = filters.status;
  if (filters.plate) query.plate = normalizePlate(filters.plate);
  if (filters.personName) query.personName = new RegExp(filters.personName, "i");
  if (filters.personDocument) query.personDocument = filters.personDocument;
  if (filters.visitorType) query.visitorType = filters.visitorType;
  if (filters.date) {
    const startOfDay = new Date(filters.date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1);
    query.entryAt = { $gte: startOfDay, $lt: endOfDay };
  }

  const { page, limit } = filters;
  const [records, total] = await Promise.all([
    AccessRecord.find(query)
      .sort({ entryAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .populate("vehicle", "matricula marca modelo color")
      .populate("registeredBy", "username email")
      .populate("checkedOutBy", "username email"),
    AccessRecord.countDocuments(query),
  ]);

  return { records, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}

export default { checkIn, checkOut, getAccessRecordById, listAccessRecords };
