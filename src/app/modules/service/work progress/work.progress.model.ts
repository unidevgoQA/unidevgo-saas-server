import { model, Schema } from "mongoose";
import { TWorkProgress } from "./work.progress.interface";

const WorkProgressSchema = new Schema<TWorkProgress>(
  {
    employeeId: { type: String, required: true },
    companyId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    totalWorkHours: { type: Number },
    trackerStatus: {
      type: String,
      enum: ["Running", "Stopped"],
      required: true,
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const WorkProgressModel = model<TWorkProgress>(
  "Work Progress",
  WorkProgressSchema
);
