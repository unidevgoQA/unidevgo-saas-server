import { NextFunction, Request, Response } from "express";
import { WorkProgressService } from "./work.progress.service";

// Start tracker
const startTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.body;
    const progress = await WorkProgressService.startTracker(employeeId);

    res.status(200).json({
      success: true,
      message: "Tracker started successfully",
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

// Stop tracker
const stopTracker = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { employeeId } = req.body;
    const progress = await WorkProgressService.stopTracker(employeeId);

    res.status(200).json({
      success: true,
      message: "Tracker stopped successfully",
      data: progress,
    });
  } catch (err) {
    next(err);
  }
};

export const WorkProgressControllers = {
  startTracker,
  stopTracker,
};
