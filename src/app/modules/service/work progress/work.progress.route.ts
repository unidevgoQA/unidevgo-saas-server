import express from "express";
import { WorkProgressControllers } from "./work.progress.controller";

const router = express.Router();

router.post("/start", WorkProgressControllers.startTracker);
router.post("/stop", WorkProgressControllers.stopTracker);
router.post("/filter", WorkProgressControllers.filterWorkProgress);
// Route to get work progresses by companyId
router.get(
  "/company/:companyId",
  WorkProgressControllers.getWorkProgressByCompanyId
);
router.get(
  "/employee/:employeeId",
  WorkProgressControllers.getWorkProgressByEmployeeId
);
router.delete("/:workProgressId", WorkProgressControllers.deleteWorkProgress);

export const WorkProgressRoutes = router;
