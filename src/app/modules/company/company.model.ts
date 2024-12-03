import { model, Schema } from "mongoose";

import { TCompany, TSubscription } from "./company.interface";

const SubscriptionSchema = new Schema<TSubscription>(
  {
    plan: { type: String, required: true },
    services: { type: [String], required: true },
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
  },
  { _id: false }
);

const CompanySchema = new Schema<TCompany>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    needsPasswordChange: { type: Boolean, default: false },
    subscription: { type: SubscriptionSchema, required: true },
    profileImageUrl: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const CompanyModel = model<TCompany>("Company", CompanySchema);
