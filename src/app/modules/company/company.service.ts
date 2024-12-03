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

const updateCompanyInDB = async (id: string, updateData: Partial<TCompany>) => {
  const result = await CompanyModel.findOneAndUpdate(
    { id },
    { $set: updateData }, // Use `$set` to update only the provided fields
    { new: true } // Return the updated document
  );
  return result;
};
export const CompanyServices = {
  createCompanyIntoDB,
  getAllCompaniesFromDB,
  getSingleComapnyFromDB,
  deleteCompanyFromDB,
  updateCompanyInDB,
};
