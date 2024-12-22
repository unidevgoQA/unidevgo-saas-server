import { Request, Response } from "express";
import { ZodError } from "zod";
import { LeaveManagementService } from "./leave.management.service";
import { leaveManagentValidation } from "./leave.management.validation";

// Utility function for centralized error handling
const handleError = (
  res: Response,
  error: any,
  statusCode = 500,
  defaultMessage = "Something went wrong"
) => {
  console.error("Error:", error); // Log the error for debugging
  const message =
    error instanceof ZodError
      ? error.errors.map((e) => e.message).join(", ") // Format validation errors
      : error.message || defaultMessage;

  res.status(statusCode).json({
    success: false,
    message,
    error: error.stack || error, // Include stack trace for debugging in non-production environments
  });
};

// Controller to apply for a leave
const applyLeave = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leave: leaveData } = req.body;

    // Validate input using zod schema
    const parsedData =
      leaveManagentValidation.leaveManagementValidationSchema.parse(leaveData);

    // Save leave to the database
    const result = await LeaveManagementService.applyLeaveIntoDB(parsedData);

    res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error, error instanceof ZodError ? 400 : 500);
  }
};

// Controller to retrieve all leaves
const getAllLeaves = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await LeaveManagementService.getAllLeavesFromDB();

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No leave records found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leaves retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to retrieve leaves by company ID
const getLeaveByCompanyId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { companyId } = req.params;

    const leaves = await LeaveManagementService.geLeaveByCompanyId(companyId);

    if (leaves.length === 0) {
      res.status(404).json({
        success: false,
        message: "No leave records found for the given company ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leaves retrieved successfully",
      data: leaves,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to retrieve leaves by employee ID
const getLeaveByEmployeeId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;

    const leaves = await LeaveManagementService.getleaveByEmployeeId(
      employeeId
    );

    if (leaves.length === 0) {
      res.status(404).json({
        success: false,
        message: "No leave records found for the given employee ID",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leave records retrieved successfully",
      data: leaves,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update leave status
const updateLeaveStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { leaveId } = req.params;
    const { status } = req.body;

    if (!status) {
      res.status(400).json({
        success: false,
        message: "Status is required",
      });
      return;
    }

    const result = await LeaveManagementService.updateLeaveStatusInDB(
      leaveId,
      status
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to delete a leave record
const deleteLeave = async (req: Request, res: Response): Promise<void> => {
  try {
    const { leaveId } = req.params;

    const result = await LeaveManagementService.deleteSingleLeaveFromDB(
      leaveId
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Leave record not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Leave record deleted successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Export all controllers
export const LeaveManagementControllers = {
  applyLeave,
  getAllLeaves,
  getLeaveByCompanyId,
  getLeaveByEmployeeId,
  updateLeaveStatus,
  deleteLeave,
};
