import { TLeaveManagement } from "./leave.management.interface";
import { LeaveManagementModel } from "./leave.management.model";

const applyLeaveIntoDB = async (leave: TLeaveManagement) => {
  const result = await LeaveManagementModel.create(leave);
  return result;
};

export const LeaveManagementService = {
  applyLeaveIntoDB,
};
