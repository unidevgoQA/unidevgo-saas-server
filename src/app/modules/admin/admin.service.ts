import { TAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

const createAdminInDB = async (adminData: TAdmin) => {
  const result = await AdminModel.create(adminData);
  return result;
};

const getAllAdminsFromDB = async () => {
  const admins = await AdminModel.find();
  return admins;
};

const getAdminByIdFromDB = async (id: string) => {
  const admin = await AdminModel.findOne({ id });
  return admin;
};

const deleteAdminFromDB = async (id: string) => {
  const result = await AdminModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateAdminInDB = async (id: string, updateData: Partial<TAdmin>) => {
  const result = await AdminModel.findOneAndUpdate(
    { id },
    { $set: updateData },
    { new: true }
  );
  return result;
};

const getAdminByEmail = async (email: string) => {
  const result = await AdminModel.findOne({ email });
  return result;
};

export const AdminServices = {
  createAdminInDB,
  getAllAdminsFromDB,
  getAdminByIdFromDB,
  updateAdminInDB,
  deleteAdminFromDB,
  getAdminByEmail,
};
