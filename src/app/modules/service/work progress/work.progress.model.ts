import { model, Schema } from "mongoose";
import { TWorkProgress } from "./work.progress.interface";

// Define the schema for WorkProgress
const WorkProgressSchema = new Schema<TWorkProgress>(
  {
    employeeId: { type: String, required: true },
    date: { type: Date, required: true },
    startTime: { type: Date },
    endTime: { type: Date },
    totalWorkHours: { type: Number },
    trackerStatus: {
      type: String,
      enum: ["Running", "Stopped"],
      required: true,
    },
  },
  { timestamps: true }
);

export const WorkProgressModel = model<TWorkProgress>(
  "Work Progress",
  WorkProgressSchema
);
