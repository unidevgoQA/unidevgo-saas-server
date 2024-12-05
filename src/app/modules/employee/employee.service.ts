import { TEmployee } from "./employee.interface";
import { EmployeeModel } from "./employee.model";

const createEmployeeIntoDB = async (employee: TEmployee) => {
  const result = await EmployeeModel.create(employee);
  return result;
};

const getAllEmployeesFromDB = async () => {
  const result = await EmployeeModel.find();
  return result;
};

const getSingleEmployeeFromDB = async (id: string) => {
  const result = await EmployeeModel.findOne({ id });
  return result;
};

const deleteEmployeeFromDB = async (id: string) => {
  const result = await EmployeeModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateEmployeeInDB = async (
  id: string,
  updateData: Partial<TEmployee>
) => {
  const result = await EmployeeModel.findOneAndUpdate(
    { id },
    { $set: updateData },
    { new: true }
  );
  return result;
};

export const EmployeeService = {
  createEmployeeIntoDB,
  getAllEmployeesFromDB,
  getSingleEmployeeFromDB,
  deleteEmployeeFromDB,
  updateEmployeeInDB,
};
