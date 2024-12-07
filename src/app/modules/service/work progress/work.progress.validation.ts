import { z } from "zod";

// Define Zod validation schema for WorkProgress
export const WorkProgressValidationSchema = z.object({
  employeeId: z.string().nonempty("Employee ID is required."),
  date: z.date({ required_error: "Date is required." }),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  totalWorkHours: z.number().optional(),
  trackerStatus: z.enum(["Running", "Stopped"], {
    required_error: "Tracker status is required.",
  }),
});

export const workProgressValidation = {
  WorkProgressValidationSchema,
};
