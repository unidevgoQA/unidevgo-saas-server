export type TWorkProgress = {
  employeeId: string;
  companyId: string;
  date: Date;
  startTime?: Date;
  endTime?: Date;
  totalWorkHours?: number;
  trackerStatus: "Running" | "Stopped";
  createdAt: Date;
  updatedAt: Date;
};
