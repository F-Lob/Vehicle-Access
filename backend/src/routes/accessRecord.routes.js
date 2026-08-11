import { Router } from "express";
import accessRecordController from "../controllers/accessRecord.controller.js";
import { canViewAccessRecords, isOperator } from "../middlewares/authorization.middleware.js";

const router = Router();

router.post("/check-in", isOperator, accessRecordController.checkIn);
router.post("/:id/check-out", isOperator, accessRecordController.checkOut);
router.get("/", canViewAccessRecords, accessRecordController.listAccessRecords);
router.get("/:id", canViewAccessRecords, accessRecordController.getAccessRecordById);

export default router;
