import moment from "moment";
import { WorkProgressModel } from "./work.progress.model";

const startTracker = async (employeeId: string, companyId: string) => {
  const today = moment().startOf("day").toDate();

  // Check if a tracker already exists for today
  let progress = await WorkProgressModel.findOne({
    employeeId,
    companyId,
    date: today,
  });

  if (!progress) {
    // Create a new tracker if none exists
    progress = new WorkProgressModel({
      employeeId,
      companyId,
      date: today,
      startTime: new Date(),
      trackerStatus: "Running",
    });
    await progress.save();
  } else if (progress.trackerStatus === "Running") {
    throw new Error("Tracker is already running.");
  } else {
    progress.startTime = new Date();
    progress.trackerStatus = "Running";
    await progress.save();
  }

  return progress;
};

const stopTracker = async (employeeId: string) => {
  const today = moment().startOf("day").toDate();

  // Find today's tracker
  const progress = await WorkProgressModel.findOne({ employeeId, date: today });

  if (!progress) {
    throw new Error("No tracker found for today.");
  }

  if (progress.trackerStatus === "Stopped") {
    throw new Error("Tracker is already stopped.");
  }

  const endTime = new Date();
  const totalWorkHours = moment(endTime).diff(
    moment(progress.startTime),
    "hours",
    true
  );

  progress.endTime = endTime;
  progress.totalWorkHours = totalWorkHours;
  progress.trackerStatus = "Stopped";

  await progress.save();

  return progress;
};

const filterWorkProgressByDate = async (employeeId: string, date: Date) => {
  // Query for a specific date
  const result = await WorkProgressModel.find({
    employeeId,
    date: { $eq: date },
  });

  return result;
};

const filterWorkProgressByDateRange = async (
  employeeId: string,
  startDate: Date,
  endDate: Date
) => {
  // Query for a date range
  const result = await WorkProgressModel.find({
    employeeId,
    date: {
      $gte: startDate, // Greater than or equal to startDate
      $lte: endDate, // Less than or equal to endDate
    },
  });

  return result;
};

const getWorkProgressByCompanyId = async (companyId: string) => {
  // Fetch work progresses matching the companyId
  const workProgresses = await WorkProgressModel.find({ companyId });
  return workProgresses;
};

export const WorkProgressService = {
  startTracker,
  stopTracker,
  filterWorkProgressByDate,
  filterWorkProgressByDateRange,
  getWorkProgressByCompanyId,
};
