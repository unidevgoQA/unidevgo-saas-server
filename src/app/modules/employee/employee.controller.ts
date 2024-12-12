import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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

const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body.employee;

    console.log(employeeId, updateData);

    // Ensure the updateData is not empty and contains valid fields to update
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const result = await EmployeeService.updateEmployeeInDB(
      employeeId,
      updateData
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error updating company:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const loginEmployee = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // Check if the company exists
    const employee = await EmployeeService.getEmployeeByEmail(email);

    if (!employee || employee.isDeleted) {
      return res.status(404).json({
        success: false,
        message: "Invalid email or company not found",
      });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        _id: employee._id,
        id: employee.id,
        name: employee.name,
        email: employee.email,
      },
      process.env.JWT_SECRET || "jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
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
  updateEmployee,
  loginEmployee,
};
