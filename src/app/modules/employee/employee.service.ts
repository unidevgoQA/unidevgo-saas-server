import { TEmployee } from "./employee.interface";
import { EmployeeModel } from "./employee.model";

const createEmployeeIntoDB = async (employee: TEmployee) => {
  const result = await EmployeeModel.create(employee);
  return result;
};

export const EmployeeServices = {
  createEmployeeIntoDB,
};
