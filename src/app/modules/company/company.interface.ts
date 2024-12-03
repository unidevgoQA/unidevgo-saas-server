export type TSubscription = {
  plan: string;
  services: string[];
  startDate: string;
  expiryDate: string;
  status: "active" | "inactive";
};

export type TCompany = {
  id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  subscription: TSubscription;
  profileImageUrl: string;
  address: string;
  contactNumber: string;
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted: boolean;
};
