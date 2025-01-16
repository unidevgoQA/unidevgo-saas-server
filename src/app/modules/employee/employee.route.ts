import express from "express";
import { EmployeeControllers } from "./employee.controller";

const router = express.Router();

router.get("/", EmployeeControllers.getAllEmployees);
router.post("/create-employee", EmployeeControllers.createEmployee);
router.get("/:employeeId", EmployeeControllers.getSingleEmployee);
// Route to get work progresses by companyId
router.get("/company/:companyId", EmployeeControllers.getEmployeesByCompanyId);
router.delete("/:employeeId", EmployeeControllers.deleteEmployee);
router.put("/:employeeId", EmployeeControllers.updateEmployee);
router.post("/login", EmployeeControllers.loginEmployee);
router.put("/update-password/:employeeId", EmployeeControllers.updatePassword);

export const EmployeeRoutes = router;
