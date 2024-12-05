import { model, Schema } from "mongoose";
import { TEmployee } from "./employee.interface";

const EmployeeSchema = new Schema<TEmployee>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    role: { type: String, required: true },
    designation: { type: String, required: true },
    companyId: { type: String, required: true },
    joiningDate: { type: Date, required: true },
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    profileImageUrl: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const EmployeeModel = model<TEmployee>("Employee", EmployeeSchema);
