import express from "express";
import { EmployeeControllers } from "./employee.controller";

const router = express.Router();

router.get("/", EmployeeControllers.getAllEmployees);
router.post("/create-employee", EmployeeControllers.createEmployee);
router.get("/:employeeId", EmployeeControllers.getSingleEmployee);
router.delete("/:employeeId", EmployeeControllers.deleteEmployee);
router.put("/:employeeId", EmployeeControllers.updateEmployee);

export const EmployeeRoutes = router;
