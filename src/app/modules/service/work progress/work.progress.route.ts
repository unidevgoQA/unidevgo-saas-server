import express from "express";
import { WorkProgressControllers } from "./work.progress.controller";

const router = express.Router();

// Start tracker
router.post("/start", WorkProgressControllers.startTracker);

// Stop tracker
router.post("/stop", WorkProgressControllers.stopTracker);

export const WorkProgressRoutes = router;
