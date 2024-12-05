import { z } from "zod";

export const employeeValidationSchema = z.object({
  id: z.string().nonempty({ message: "ID is required and cannot be empty." }),
  name: z
    .string()
    .nonempty({ message: "Name is required and cannot be empty." }),
  email: z
    .string()
    .email({ message: "Invalid email address." })
    .nonempty({ message: "Email is required and cannot be empty." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long." })
    .nonempty({ message: "Password is required and cannot be empty." }),
  needsPasswordChange: z.boolean().optional().default(false),
  role: z
    .string()
    .nonempty({ message: "Role is required and cannot be empty." }),
  designation: z
    .string()
    .nonempty({ message: "Designation is required and cannot be empty." }),
  companyId: z
    .string()
    .nonempty({ message: "Company ID is required and cannot be empty." }),
  joiningDate: z
    .date({ required_error: "Joining date is required." })
    .refine((date) => date <= new Date(), {
      message: "Joining date cannot be in the future.",
    }),
  gender: z.enum(["male", "female", "other"], {
    message: "Gender must be 'male', 'female', or 'other'.",
  }),
  profileImageUrl: z
    .string()
    .url({ message: "Profile image URL must be a valid URL." })
    .nonempty({
      message: "Profile image URL is required and cannot be empty.",
    }),
  address: z
    .string()
    .nonempty({ message: "Address is required and cannot be empty." }),
  contactNumber: z
    .string()
    .nonempty({ message: "Contact number is required and cannot be empty." })
    .regex(/^\+?[0-9]{10,15}$/, {
      message: "Contact number must be a valid phone number.",
    }),
  isDeleted: z.boolean().optional().default(false),
});

export const employeeValidation = {
  employeeValidationSchema,
};
