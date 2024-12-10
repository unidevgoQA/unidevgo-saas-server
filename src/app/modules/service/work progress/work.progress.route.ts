import express from "express";
import { WorkProgressControllers } from "./work.progress.controller";

const router = express.Router();

router.post("/start", WorkProgressControllers.startTracker);
router.post("/stop", WorkProgressControllers.stopTracker);
router.post("/filter", WorkProgressControllers.filterWorkProgress);

export const WorkProgressRoutes = router;
