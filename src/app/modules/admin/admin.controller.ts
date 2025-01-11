import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";
import { AdminServices } from "./admin.service";
import { AdminValidation } from "./admin.validation";

// Utility function for centralized error handling
const handleError = (
  res: Response,
  error: any,
  statusCode = 500,
  defaultMessage = "Something went wrong"
) => {
  console.error("Error:", error); // Log the error for debugging
  const message =
    error instanceof ZodError
      ? error.errors.map((e) => e.message).join(", ") // Format validation errors
      : error.message || defaultMessage;

  res.status(statusCode).json({
    success: false,
    message,
    error: error.stack || error, // Include stack trace for debugging in non-production environments
  });
};

// Controller to create a new admin
const createAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const adminData = AdminValidation.AdminValidationSchema.parse(req.body);

    const result = await AdminServices.createAdminInDB(adminData);

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      handleError(res, error, 400, "Validation error");
    } else {
      handleError(res, error);
    }
  }
};

// Controller to retrieve all admins
const getAllAdmins = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await AdminServices.getAllAdminsFromDB();

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No admins found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to retrieve a single admin by ID
const getAdminById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;

    const result = await AdminServices.getAdminByIdFromDB(adminId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update admin details
const updateAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;
    const updateData = req.body;

    if (!updateData) {
      res.status(400).json({
        success: false,
        message: "No update data provided",
      });
      return;
    }

    const result = await AdminServices.updateAdminInDB(adminId, updateData);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin updated successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to delete an admin
const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;

    const result = await AdminServices.deleteAdminFromDB(adminId);

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller for admin login
const loginAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
      return;
    }

    const admin = await AdminServices.getAdminByEmail(email);

    if (!admin || admin.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Invalid email or admin not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign(
      { _id: admin._id, id: admin.id, name: admin.name, email: admin.email },
      process.env.JWT_SECRET || "jwt_secret",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      profile: {
        _id: admin._id,
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
      role: "admin",
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update admin password
const updatePassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
      return;
    }

    const admin = await AdminServices.getAdminByIdFromDB(adminId);

    if (!admin || admin.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Admin not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      admin.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
      return;
    }

    const result = await AdminServices.updateAdminPasswordInDB(
      adminId,
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
export const AdminControllers = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  updatePassword,
};
