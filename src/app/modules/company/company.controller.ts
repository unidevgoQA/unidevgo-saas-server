import { Request, Response } from "express";
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

export const CompanyControllers = {
  createCompany,
  getAllCompanies,
};
