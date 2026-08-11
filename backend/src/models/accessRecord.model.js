import { Schema, model } from "mongoose";

export const ACCESS_RECORD_STATUSES = ["inside", "closed"];
export const VISITOR_TYPES = ["resident", "visitor", "provider", "employee", "other"];

const accessRecordSchema = new Schema(
  {
    site: { type: String, trim: true, maxlength: 120 },
    vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    plate: { type: String, required: true, trim: true, uppercase: true, index: true },
    personName: { type: String, required: true, trim: true, maxlength: 120 },
    personDocument: { type: String, trim: true, maxlength: 30, index: true },
    visitorType: { type: String, enum: VISITOR_TYPES, default: "visitor", index: true },
    purpose: { type: String, trim: true, maxlength: 255, default: "Not specified" },
    entryAt: { type: Date, default: Date.now, required: true, index: true },
    exitAt: { type: Date, default: null },
    status: { type: String, enum: ACCESS_RECORD_STATUSES, default: "inside", required: true, index: true },
    registeredBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    checkedOutBy: { type: Schema.Types.ObjectId, ref: "User", default: null },
    notes: { type: String, trim: true, maxlength: 1000, default: "" },
  },
  { timestamps: true, versionKey: false },
);

accessRecordSchema.index({ plate: 1, status: 1 });
accessRecordSchema.index({ status: 1, entryAt: -1 });

const AccessRecord = model("AccessRecord", accessRecordSchema);

export default AccessRecord;
