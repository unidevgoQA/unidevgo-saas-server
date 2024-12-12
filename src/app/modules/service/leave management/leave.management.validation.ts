import { z } from "zod";

const leaveManagementValidationSchema = z.object({
  employeeId: z.string().min(1, "Employee ID is required"),
  companyId: z.string().min(1, "Company ID is required"),
  leaveApply: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid leave application date",
    }),
  leaveFrom: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid leave start date",
    }),
  leaveTo: z
    .union([z.date(), z.string().transform((val) => new Date(val))])
    .refine((date) => !isNaN(date.getTime()), {
      message: "Invalid leave end date",
    }),
  leaveType: z.string().min(1, "Leave type is required"),
  totalDays: z.number().min(1, "Total days must be at least 1"),
  status: z.enum(["Pending", "Accepted", "Rejected"]),
  isDeleted: z.boolean().default(false),
});

// For updating leave management status
const leaveStatusUpdateSchema = z.object({
  status: z.enum(["Pending", "Accepted", "Rejected"]),
});

export const leaveManagentValidation = {
  leaveManagementValidationSchema,
  leaveStatusUpdateSchema,
};
