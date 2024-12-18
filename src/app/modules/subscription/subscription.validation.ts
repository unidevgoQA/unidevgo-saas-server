import { z } from "zod";

const SubscriptionValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  plan: z.string().min(1, "Plan is required"),
  services: z.array(z.string()).min(1, "At least one service is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for start Date",
  }), // Validates ISO 8601 date string
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for expiry Date",
  }),
  status: z.enum(["active", "inactive"]),
  price: z.number(),
  isDeleted: z.boolean().optional().default(false),
});

export const SubscriptionValidation = {
  SubscriptionValidationSchema,
};
