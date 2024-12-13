import { NextFunction, Request, Response } from "express";
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

const getAllLeaves = async (req: Request, res: Response) => {
  try {
    const result = await LeaveManagementService.getAllLeavesFromDB();
    res.status(200).json({
      success: true,
      message: "Leaves Data Retrieved",
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

const getLeaveByCompanyId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { companyId } = req.params;
    const leaves = await LeaveManagementService.geLeaveByCompanyId(companyId);

    if (leaves.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leave found for the given company Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Work progresses retrieved successfully",
      data: leaves,
    });
  } catch (err) {
    next(err);
  }
};

const getLeaveByEmployeeId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { employeeId } = req.params;
    const leaves = await LeaveManagementService.getleaveByEmployeeId(
      employeeId
    );

    if (leaves.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No leave found for the given employee Id",
      });
    }

    res.status(200).json({
      success: true,
      message: "Leave record retrieved successfully",
      data: leaves,
    });
  } catch (err) {
    next(err);
  }
};

const updateLeaveStatus = async (req: Request, res: Response) => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    const result = await LeaveManagementService.updateLeaveStatusInDB(
      leaveId,
      status
    );
    res.status(200).json({
      success: true,
      message: "Status update successfully",
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

const deleteLeave = async (req: Request, res: Response) => {
  try {
    const { leaveId } = req.params;
    const result = await LeaveManagementService.deleteSingleLeaveFromDB(
      leaveId
    );
    res.status(200).json({
      success: true,
      message: "Leave record deleted Successfully",
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
  deleteLeave,
  getLeaveByEmployeeId,
  getLeaveByCompanyId,
  updateLeaveStatus,
  getAllLeaves,
};
