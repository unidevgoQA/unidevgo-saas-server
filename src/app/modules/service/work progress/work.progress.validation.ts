import { z } from "zod";

export const WorkProgressValidationSchema = z.object({
  employeeId: z.string().nonempty("Employee ID is required."),
  date: z.date().optional(),
  startTime: z.date().optional(),
  endTime: z.date().optional(),
  totalWorkHours: z.number().optional(),
  trackerStatus: z.enum(["Running", "Stopped"]).optional(), // Optional for this endpoint
});

export const workProgressValidation = {
  WorkProgressValidationSchema,
};
