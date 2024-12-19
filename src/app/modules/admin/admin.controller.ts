import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AdminServices } from "./admin.service";
import { AdminValidation } from "./admin.validation";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const adminData = AdminValidation.AdminValidationSchema.parse(req.body);

    const result = await AdminServices.createAdminInDB(adminData);
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      data: result,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: "Failed to create admin",
      error: err,
    });
  }
};

const getAllAdmins = async (req: Request, res: Response) => {
  try {
    const result = await AdminServices.getAllAdminsFromDB();
    res.status(200).json({
      success: true,
      message: "Admins retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve admins",
      error: err,
    });
  }
};

const getAdminById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;
    const result = await AdminServices.getAdminByIdFromDB(adminId);
    res.status(200).json({
      success: true,
      message: "Admin Retrieved Successfully",
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
  } catch (err) {
    console.error("Error updating Admin:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const deleteAdmin = async (req: Request, res: Response): Promise<void> => {
  try {
    const { adminId } = req.params;
    const result = await AdminServices.deleteAdminFromDB(adminId);
    res.status(200).json({
      success: true,
      message: "Admin deleted successfully",
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
      {
        _id: admin._id,
        id: admin.id,
        name: admin.name,
        email: admin.email,
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
  } catch (err) {
    console.error("Error updating password:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const AdminControllers = {
  createAdmin,
  getAllAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  loginAdmin,
  updatePassword,
};
