import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { EmployeeService } from "./employee.service";
import { employeeValidation } from "./employee.validation";

// Utility function for handling and responding to errors
const handleError = (
  res: Response,
  error: any,
  statusCode = 500,
  defaultMessage = "Something went wrong"
) => {
  console.error("Error:", error); // Log the error for debugging
  const message =
    error instanceof ZodError
      ? error.errors.map((e) => e.message).join(", ") // Format zod validation errors
      : error.message || defaultMessage;

  res.status(statusCode).json({
    success: false,
    message,
    error: error.stack || error, // Include stack trace in non-production environments
  });
};

// Controller to create a new employee
const createEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employee: employeeData } = req.body;

    // Validate input using zod schema
    const zodParseData =
      employeeValidation.employeeValidationSchema.parse(employeeData);

    // Create the employee in the database
    const result = await EmployeeService.createEmployeeIntoDB(zodParseData);

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: result,
    });
  } catch (error) {
    // Handle validation errors explicitly
    if (error instanceof ZodError) {
      handleError(res, error, 400, "Validation error");
    } else {
      handleError(res, error);
    }
  }
};

// Controller to retrieve all employees
const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await EmployeeService.getAllEmployeesFromDB();

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No employees found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employees data retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to retrieve a single employee by ID
const getSingleEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { employeeId } = req.params;

    const result = await EmployeeService.getSingleEmployeeFromDB(employeeId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to delete an employee by ID
const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;

    const result = await EmployeeService.deleteEmployeeFromDB(employeeId);

    if (result.matchedCount === 0) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update an employee's details
const updateEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const updateData = req.body.employee;

    // Check if update data is provided
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
  } catch (error) {
    handleError(res, error);
  }
};

// Controller for employee login
const loginEmployee = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    // Fetch the employee by email
    const employee = await EmployeeService.getEmployeeByEmail(email);

    if (!employee || employee.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Invalid email or employee not found",
      });
      return;
    }

    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, employee.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    // Generate a JWT for authentication
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
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update an employee's password
const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { employeeId } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Validate input
    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
      return;
    }

    // Fetch the employee by ID
    const employee = await EmployeeService.getSingleEmployeeFromDB(employeeId);

    if (!employee || employee.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Employee not found",
      });
      return;
    }

    // Verify the current password
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

    // Update the password in the database
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
  } catch (error) {
    handleError(res, error);
  }
};

// Export all controllers
export const EmployeeControllers = {
  createEmployee,
  getAllEmployees,
  getSingleEmployee,
  deleteEmployee,
  updateEmployee,
  loginEmployee,
  updatePassword,
};
