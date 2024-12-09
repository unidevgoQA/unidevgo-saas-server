import express from "express";
import { WorkProgressControllers } from "./work.progress.controller";

const router = express.Router();

router.post("/", WorkProgressControllers.startTracker);

export const WorkProgressRoutes = router;
