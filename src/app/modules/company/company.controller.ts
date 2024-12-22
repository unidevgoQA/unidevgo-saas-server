import bcrypt from "bcrypt";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CompanyServices } from "./company.service";
import { CompanyValidation } from "./company.validation";

const createCompany = async (req: Request, res: Response) => {
  try {
    const { company: companytData } = req.body;
    //data validation using zod
    const zodParseData =
      CompanyValidation.CompanyValidationSchema.parse(companytData);

    const result = await CompanyServices.createCompanyIntoDB(zodParseData);
    res.status(200).json({
      success: true,
      message: "Company created successfully",
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

const getAllCompanies = async (req: Request, res: Response) => {
  try {
    const result = await CompanyServices.getAllCompaniesFromDB();
    console.log(result);
    res.status(200).json({
      success: true,
      message: "Companies Data Retrieved",
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

const getSingleCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const result = await CompanyServices.getSingleComapnyFromDB(companyId);
    res.status(200).json({
      success: true,
      message: "Company Retrieved Successfully",
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

const deleteCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const result = await CompanyServices.deleteCompanyFromDB(companyId);
    res.status(200).json({
      success: true,
      message: "Company deleted Successfully",
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

const updateCompany = async (req: Request, res: Response): Promise<void> => {
  try {
    const { companyId } = req.params;
    const updateData = req.body.company;

    // Ensure the updateData is not empty and contains valid fields to update
    if (!updateData) {
      res.status(400).json({
        success: false,
        message: "No update data provided",
      });
      return;
    }

    const result = await CompanyServices.updateCompanyInDB(
      companyId,
      updateData
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error updating Company:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const loginCompany = async (req: Request, res: Response): Promise<void> => {
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

    // Check if the company exists
    const company = await CompanyServices.getCompanyByEmail(email);

    if (!company || company.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Invalid email or employee not found",
      });
      return;
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, company.password);
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
        _id: company._id,
        id: company.id,
        name: company.name,
        email: company.email,
      },
      process.env.JWT_SECRET || "jwt_secret", // Replace with a secure secret in production
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
    const { companyId } = req.params;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({
        success: false,
        message: "Current password and new password are required",
      });
      return;
    }

    const company = await CompanyServices.getSingleComapnyFromDB(companyId);

    if (!company || company.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Company not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      company.password
    );

    if (!isPasswordValid) {
      res.status(401).json({
        success: false,
        message: "Current password is incorrect",
      });
      return;
    }

    const result = await CompanyServices.updateCompanyPasswordInDB(
      companyId,
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

export const CompanyControllers = {
  createCompany,
  getAllCompanies,
  getSingleCompany,
  deleteCompany,
  updateCompany,
  loginCompany,
  updatePassword,
};
