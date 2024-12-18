import cors from "cors";
import express, { Application, Request, Response } from "express";
import { CompanyRoutes } from "./app/modules/company/company.route";
import { EmployeeRoutes } from "./app/modules/employee/employee.route";
import { LeaveManagementRoutes } from "./app/modules/service/leave management/leave.management.route";
import { WorkProgressRoutes } from "./app/modules/service/work progress/work.progress.route";
import { SubscriptionRoutes } from "./app/modules/subscription/subscription.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use("/api/v1/companies", CompanyRoutes);
app.use("/api/v1/employees", EmployeeRoutes);
app.use("/api/v1/subscriptions", SubscriptionRoutes);
app.use("/api/v1/work-progress", WorkProgressRoutes);
app.use("/api/v1/leave", LeaveManagementRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

export default app;
