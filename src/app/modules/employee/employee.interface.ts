export type TEmployee = {
  id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  role: string;
  designation: string;
  companyId: string;
  joiningDate: Date;
  gender: "male" | "female" | "other";
  profileImageUrl: string;
  address: string;
  contactNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
};
