import { Request, Response } from "express";
import { LeaveManagementService } from "./leave.management.service";
import { leaveManagentValidation } from "./leave.management.validation";

const applyLeave = async (req: Request, res: Response) => {
  try {
    const { leave: leaveData } = req.body;

    //data validation using zod
    const zodParseData =
      leaveManagentValidation.leaveManagementValidationSchema.parse(leaveData);

    const result = await LeaveManagementService.applyLeaveIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Apply leave successfully",
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

export const LeaveManagementControllers = {
  applyLeave,
};
