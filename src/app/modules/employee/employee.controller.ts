import { Request, Response } from "express";
import { EmployeeService } from "./employee.service";
import { employeeValidation } from "./employee.validation";

const createEmployee = async (req: Request, res: Response) => {
  try {
    const { employee: employeeData } = req.body;

    //data validation using zod
    const zodParseData =
      employeeValidation.employeeValidationSchema.parse(employeeData);

    const result = await EmployeeService.createEmployeeIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Employee created successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const result = await EmployeeService.getAllEmployeesFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Employees Data Retrieved",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const getSingleEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const result = await EmployeeService.getSingleEmployeeFromDB(employeeId);
    res.status(200).json({
      success: true,
      message: "Employee Retrieved Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const result = await EmployeeService.deleteEmployeeFromDB(employeeId);
    res.status(200).json({
      success: true,
      message: "Employee deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const EmployeeControllers = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
};
