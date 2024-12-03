import { z } from "zod";

const SubscriptionValidationSchema = z.object({
  plan: z.string().min(1, "Plan is required"), // Ensures a non-empty string
  services: z.array(z.string()).min(1, "At least one service is required"),
  startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for start Date",
  }), // Validates ISO 8601 date string
  expiryDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format for expiry Date",
  }),
  status: z.enum(["active", "inactive"]),
});

const CompanyValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  needsPasswordChange: z.boolean().optional().default(false),
  subscription: SubscriptionValidationSchema,
  profileImageUrl: z.string().url("Invalid URL format for profile Image Url"),
  address: z.string().min(1, "Address is required"),
  contactNumber: z
    .string()
    .min(10, "Contact number must be at least 10 characters long"),
  isDeleted: z.boolean().optional().default(false),
  createdAt: z
    .date()
    .optional()
    .refine((val) => val instanceof Date, {
      message: "Invalid date format for createdAt.",
    }),
  updatedAt: z
    .date()
    .optional()
    .refine((val) => val instanceof Date, {
      message: "Invalid date format for updatedAt.",
    }),
});

export const CompanyValidation = {
  CompanyValidationSchema,
};
