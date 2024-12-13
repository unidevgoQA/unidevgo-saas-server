import mongoose from "mongoose";
import { TLeaveManagement } from "./leave.management.interface";
import { LeaveManagementModel } from "./leave.management.model";

const applyLeaveIntoDB = async (leave: TLeaveManagement) => {
  const result = await LeaveManagementModel.create(leave);
  return result;
};

const getAllLeavesFromDB = async () => {
  const result = await LeaveManagementModel.find();
  return result;
};

const geLeaveByCompanyId = async (companyId: string) => {
  const leaves = await LeaveManagementModel.find({ companyId });
  return leaves;
};
const getleaveByEmployeeId = async (employeeId: string) => {
  const leaves = await LeaveManagementModel.find({ employeeId });
  return leaves;
};

const updateLeaveStatusInDB = async (_id: string, status: string) => {
  const result = await LeaveManagementModel.updateOne(
    { _id: new mongoose.Types.ObjectId(_id) },
    { status: status }
  );
  return result;
};

const deleteSingleLeaveFromDB = async (_id: string) => {
  const result = await LeaveManagementModel.updateOne(
    { _id: new mongoose.Types.ObjectId(_id) },
    { isDeleted: true }
  );
  return result;
};

export const LeaveManagementService = {
  applyLeaveIntoDB,
  deleteSingleLeaveFromDB,
  geLeaveByCompanyId,
  getleaveByEmployeeId,
  getAllLeavesFromDB,
  updateLeaveStatusInDB,
};
