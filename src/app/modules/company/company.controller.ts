import { Request, Response } from "express";
import { CompanyServices } from "./company.service";
import { CompanyValidation } from "./company.validation";

const createCompany = async (req: Request, res: Response) => {
  try {
    const { company: companytData } = req.body.company;
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

const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const updateData = req.body.company; // Access the 'company' key from the body

    // Ensure the updateData is not empty and contains valid fields to update
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: "No update data provided",
      });
    }

    const result = await CompanyServices.updateCompanyInDB(
      companyId,
      updateData
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
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

export const CompanyControllers = {
  createCompany,
  getAllCompanies,
  getSingleCompany,
  deleteCompany,
  updateCompany,
};
