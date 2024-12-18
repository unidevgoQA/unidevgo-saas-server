export type TAdmin = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: "admin" | "superAdmin";
  isActive: boolean;
  isDeleted: boolean;
};
