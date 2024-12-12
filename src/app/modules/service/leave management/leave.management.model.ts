import { model, Schema } from "mongoose";
import { TLeaveManagement } from "./leave.management.interface";

const LeaveManagementSchema = new Schema<TLeaveManagement>(
  {
    employeeId: { type: String, required: true },
    companyId: { type: String, required: true },
    leaveApply: { type: Date, required: true },
    leaveFrom: { type: Date, required: true },
    leaveTo: { type: Date, required: true },
    leaveType: { type: String, required: true },
    totalDays: { type: Number, required: true },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected"],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const LeaveManagementModel = model<TLeaveManagement>(
  "Leave",
  LeaveManagementSchema
);
