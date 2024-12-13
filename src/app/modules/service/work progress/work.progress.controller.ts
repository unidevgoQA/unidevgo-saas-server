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

const getWorkProgressByCompanyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;
    const workProgresses = await WorkProgressService.getWorkProgressByCompanyId(
      companyId
    );

    if (workProgresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No work progress found for the given company Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Work progresses retrieved successfully",
      data: workProgresses,
    });
  } catch (err) {
    next(err);
  }
};

const getWorkProgressByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params;
    const workProgresses =
      await WorkProgressService.getWorkProgressByEmployeeId(employeeId);

    if (workProgresses.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No work progress found for the given employee Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Work progresses retrieved successfully",
      data: workProgresses,
    });
  } catch (err) {
    next(err);
  }
};

const getWorkProgress = async (req: Request, res: Response) => {
  try {
    const result = await WorkProgressService.getWrokProgressFromDB();
    res.status(200).json({
      success: true,
      message: "Work rogress data retrieved",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const deleteWorkProgress = async (req: Request, res: Response) => {
  try {
    const { workProgressId } = req.params;
    const result = await WorkProgressService.deleteSingleWorkProgressFromDB(
      workProgressId
    );
    res.status(200).json({
      success: true,
      message: "Work progress deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const WorkProgressControllers = {
  startTracker,
  stopTracker,
  filterWorkProgress,
  getWorkProgressByCompanyId,
  getWorkProgressByEmployeeId,
  deleteWorkProgress,
  getWorkProgress,
};
