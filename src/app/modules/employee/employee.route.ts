import express from "express";
import { EmployeeControllers } from "./employee.controller";

const router = express.Router();

router.post("/create-employee", EmployeeControllers.createEmployee);

export const EmployeeRoutes = router;
