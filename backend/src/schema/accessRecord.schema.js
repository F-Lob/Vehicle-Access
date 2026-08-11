import Joi from "joi";
import { VISITOR_TYPES } from "../models/accessRecord.model.js";

const objectId = Joi.string().pattern(/^[0-9a-fA-F]{24}$/);

const checkInBodySchema = Joi.object({
  site: Joi.string().trim().max(120).optional(),
  vehicle: objectId.optional(),
  plate: Joi.string().trim().min(6).max(12).required(),
  personName: Joi.string().trim().min(2).max(120).required(),
  personDocument: Joi.string().trim().max(30).optional(),
  visitorType: Joi.string().valid(...VISITOR_TYPES).default("visitor"),
  purpose: Joi.string().trim().max(255).allow("").default("Not specified"),
  notes: Joi.string().trim().max(1000).allow("").default(""),
}).options({ stripUnknown: true });

const accessRecordIdSchema = Joi.object({ id: objectId.required() });

const listAccessRecordsQuerySchema = Joi.object({
  status: Joi.string().valid("inside", "closed").optional(),
  plate: Joi.string().trim().max(12).optional(),
  personName: Joi.string().trim().max(120).optional(),
  personDocument: Joi.string().trim().max(30).optional(),
  visitorType: Joi.string().valid(...VISITOR_TYPES).optional(),
  date: Joi.date().iso().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(50),
}).options({ stripUnknown: true });

export { accessRecordIdSchema, checkInBodySchema, listAccessRecordsQuerySchema };
