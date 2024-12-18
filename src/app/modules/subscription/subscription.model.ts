import { model, Schema } from "mongoose";
import { TSubscription } from "./subscription.interface";

const SubscriptionSchema = new Schema<TSubscription>(
  {
    id: { type: String, required: true, unique: true },
    plan: { type: String, required: true },
    services: { type: [String], required: true },
    startDate: { type: String, required: true },
    expiryDate: { type: String, required: true },
    status: { type: String, enum: ["active", "inactive"], required: true },
    price: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const SubscriptionModel = model<TSubscription>(
  "Subscription",
  SubscriptionSchema
);
