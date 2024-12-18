export type TSubscription = {
  id: string;
  plan: string;
  services: string[];
  startDate: string;
  expiryDate: string;
  status: "active" | "inactive";
  price: number;
  isDeleted: boolean;
};
