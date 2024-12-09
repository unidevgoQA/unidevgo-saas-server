import moment from "moment";
import { WorkProgressModel } from "./work.progress.model";

const startTracker = async (employeeId: string) => {
  const today = moment().startOf("day").toDate();

  let progress = await WorkProgressModel.findOne({ employeeId, date: today });

  if (!progress) {
    progress = new WorkProgressModel({
      employeeId,
      date: today,
      startTime: new Date(),
      trackerStatus: "Running",
    });
    await progress.save();
  } else if (progress.trackerStatus === "Stopped") {
    throw new Error("Tracker is already stopped for today.");
  } else {
    progress.startTime = new Date();
    progress.trackerStatus = "Running";
    await progress.save();
  }

  return progress;
};

export const WorkProgressService = {
  startTracker,
};
