import { Request, Response } from "express";
import { WorkProgressService } from "./work.progress.service";
import { WorkProgressValidationSchema } from "./work.progress.validation";

const startTracker = async (req: Request, res: Response) => {
  try {
    // Validate the request body
    const validatedData = WorkProgressValidationSchema.parse(req.body);

    const { employeeId } = validatedData;
    const progress = await WorkProgressService.startTracker(employeeId);

    res.status(200).json({
      success: true,
      message: "Tracker started successfully",
      data: progress,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    if (err.name === "ZodError") {
      return res.status(400).json({
        success: false,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        message: err.issues.map((issue: any) => issue.message),
        error: err,
      });
    }
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const WorkProgressControllers = {
  startTracker,
};
