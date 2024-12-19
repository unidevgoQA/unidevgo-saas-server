import { z } from "zod";

const AdminValidationSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["admin", "superAdmin"]),
  isActive: z.boolean().optional().default(true),
  isDeleted: z.boolean().optional().default(false),
});

const UpdatePasswordValidationSchema = z.object({
  currentPassword: z
    .string()
    .min(6, "Current password must be at least 6 characters long"),
  newPassword: z
    .string()
    .min(6, "New password must be at least 6 characters long"),
});

export const AdminValidation = {
  AdminValidationSchema,
  UpdatePasswordValidationSchema,
};
