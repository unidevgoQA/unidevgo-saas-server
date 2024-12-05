import cors from "cors";
import express, { Application, Request, Response } from "express";
import { CompanyRoutes } from "./app/modules/company/company.route";
import { EmployeeRoutes } from "./app/modules/employee/employee.route";
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//Application routes
app.use("/api/v1/companies", CompanyRoutes);
app.use("/api/v1/employees", EmployeeRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

export default app;
