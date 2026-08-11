import accessRecordService from "../services/accessRecord.service.js";
import {
  accessRecordIdSchema,
  checkInBodySchema,
  listAccessRecordsQuerySchema,
} from "../schema/accessRecord.schema.js";
import { respondError, respondSuccess } from "../utils/resHandler.js";
import { handleError } from "../utils/errorHandler.js";

function handleControllerError(req, res, error, context) {
  handleError(error, context);
  return respondError(req, res, error.statusCode || 500, error.message || "Error interno del servidor");
}

async function checkIn(req, res) {
  const { error, value } = checkInBodySchema.validate(req.body);
  if (error) return respondError(req, res, 400, error.message);
  try {
    const record = await accessRecordService.checkIn(value, req.userId);
    return respondSuccess(req, res, 201, record);
  } catch (serviceError) {
    return handleControllerError(req, res, serviceError, "accessRecord.controller -> checkIn");
  }
}

async function checkOut(req, res) {
  const { error } = accessRecordIdSchema.validate(req.params);
  if (error) return respondError(req, res, 400, error.message);
  try {
    const record = await accessRecordService.checkOut(req.params.id, req.userId);
    return respondSuccess(req, res, 200, record);
  } catch (serviceError) {
    return handleControllerError(req, res, serviceError, "accessRecord.controller -> checkOut");
  }
}

async function getAccessRecordById(req, res) {
  const { error } = accessRecordIdSchema.validate(req.params);
  if (error) return respondError(req, res, 400, error.message);
  try {
    const record = await accessRecordService.getAccessRecordById(req.params.id);
    return respondSuccess(req, res, 200, record);
  } catch (serviceError) {
    return handleControllerError(req, res, serviceError, "accessRecord.controller -> getAccessRecordById");
  }
}

async function listAccessRecords(req, res) {
  const { error, value } = listAccessRecordsQuerySchema.validate(req.query);
  if (error) return respondError(req, res, 400, error.message);
  try {
    const result = await accessRecordService.listAccessRecords(value);
    return respondSuccess(req, res, 200, result);
  } catch (serviceError) {
    return handleControllerError(req, res, serviceError, "accessRecord.controller -> listAccessRecords");
  }
}

export default { checkIn, checkOut, getAccessRecordById, listAccessRecords };
