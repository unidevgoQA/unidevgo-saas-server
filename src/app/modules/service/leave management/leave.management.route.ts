import express from "express";
import { LeaveManagementControllers } from "./leave.management.controller";

const router = express.Router();

router.get("/", LeaveManagementControllers.getAllLeaves);
router.post("/apply-leave", LeaveManagementControllers.applyLeave);
router.get(
  "/company/:companyId",
  LeaveManagementControllers.getLeaveByCompanyId
);
router.get(
  "/employee/:employeeId",
  LeaveManagementControllers.getLeaveByEmployeeId
);
router.delete("/:leaveId", LeaveManagementControllers.deleteLeave);

export const LeaveManagementRoutes = router;
