import { Request, Response } from "express";
import { EmployeeServices } from "./employee.service";
import { employeeValidation } from "./employee.validation";

const createEmployee = async (req: Request, res: Response) => {
  try {
    const { employee: employeeData } = req.body;

    console.log(employeeData);

    //data validation using zod
    const zodParseData =
      employeeValidation.employeeValidationSchema.parse(employeeData);

    const result = await EmployeeServices.createEmployeeIntoDB(zodParseData);
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

export const EmployeeControllers = {
  createEmployee,
};
