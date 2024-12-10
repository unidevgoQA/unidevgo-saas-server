import { NextFunction, Request, Response } from "express";
import { WorkProgressService } from "./work.progress.service";

// Start tracker
const startTracker = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId, companyId } = req.body;
    const progress = await WorkProgressService.startTracker(
      employeeId,
      companyId
    );

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

const filterWorkProgress = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId, date, startDate, endDate } = req.body;

    // Validate input
    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    let result;

    if (date) {
      // Filter by single date
      result = await WorkProgressService.filterWorkProgressByDate(
        employeeId,
        new Date(date)
      );
    } else if (startDate && endDate) {
      // Filter by date range
      result = await WorkProgressService.filterWorkProgressByDateRange(
        employeeId,
        new Date(startDate),
        new Date(endDate)
      );
    } else {
      return res.status(400).json({
        success: false,
        message:
          "Invalid filter criteria. Provide either a date or a date range.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Work progress filtered successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const WorkProgressControllers = {
  startTracker,
  stopTracker,
  filterWorkProgress,
};
