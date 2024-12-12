import express from "express";
import { LeaveManagementControllers } from "./leave.management.controller";

const router = express.Router();

router.post("/apply-leave", LeaveManagementControllers.applyLeave);

export const LeaveManagementRoutes = router;
