import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { EmployeeService } from "./employee.service";
import { employeeValidation } from "./employee.validation";

const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employee: employeeData } = req.body;

    // Data validation using zod
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

const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
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

const getSingleEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
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

const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const result = await EmployeeService.deleteEmployeeFromDB(employeeId);
    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
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

const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body.employee;

    // Ensure the updateData is not empty and contains valid fields to update
    if (!updateData) {
      res.status(400).json({
        success: false,
        message: "No update data provided",
      });
      return;
    }

    const result = await EmployeeService.updateEmployeeInDB(
      employeeId,
      updateData
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const loginEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate request data
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Check if the employee exists
    const employee = await EmployeeService.getEmployeeByEmail(email);

    if (!employee || employee.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Invalid email or employee not found",
      });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
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

const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
      return;
    }

    const employee = await EmployeeService.getSingleEmployeeFromDB(employeeId);

    if (!employee || employee.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      employee.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
      return;
    }

    const result = await EmployeeService.updateEmployeePasswordInDB(
      employeeId,
      newPassword
    );

    if (!result) {
      res.status(500).json({
        success: false,
        message: "Failed to update password",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (err) {
    console.error("Error updating password:", err);
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
  updatePassword,
};
