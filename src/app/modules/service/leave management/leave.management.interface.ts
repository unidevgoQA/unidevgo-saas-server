export type TLeaveManagement = {
  employeeId: string;
  companyId: string;
  leaveApply: Date;
  leaveFrom: Date;
  leaveTo: Date;
  leaveType: string;
  totalDays: number;
  status: "Pending" | "Accepted" | "Rejected";
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};
