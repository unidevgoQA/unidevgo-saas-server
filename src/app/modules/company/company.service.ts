import { TCompany } from "./company.interface";
import { CompanyModel } from "./company.model";

const createCompanyIntoDB = async (company: TCompany) => {
  const result = await CompanyModel.create(company);
  return result;
};

const getAllCompaniesFromDB = async () => {
  const result = await CompanyModel.find();
  console.log("From service", result);
  return result;
};

const getSingleComapnyFromDB = async (id: string) => {
  const result = await CompanyModel.findOne({ id });
  return result;
};

const deleteCompanyFromDB = async (id: string) => {
  const result = await CompanyModel.updateOne({ id }, { isDeleted: true });
  return result;
};

export const CompanyServices = {
  createCompanyIntoDB,
  getAllCompaniesFromDB,
  getSingleComapnyFromDB,
  deleteCompanyFromDB,
};
