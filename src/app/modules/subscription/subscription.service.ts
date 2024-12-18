import { TSubscription } from "./subscription.interface";
import { SubscriptionModel } from "./subscription.model";

const createSubscriptionIntoDB = async (subscription: TSubscription) => {
  const result = await SubscriptionModel.create(subscription);
  return result;
};

const getAllSubscriptionFromDB = async () => {
  const result = await SubscriptionModel.find();
  return result;
};

const getSingleSubscriptionFromDB = async (id: string) => {
  const result = await SubscriptionModel.findOne({ id });
  return result;
};

const deleteSubscriptionFromDB = async (id: string) => {
  const result = await SubscriptionModel.updateOne({ id }, { isDeleted: true });
  return result;
};

const updateSubscriptionInDB = async (
  id: string,
  updateData: Partial<TSubscription>
) => {
  const result = await SubscriptionModel.findOneAndUpdate(
    { id },
    { $set: updateData },
    { new: true }
  );
  return result;
};

export const SubscriptionServices = {
  createSubscriptionIntoDB,
  getAllSubscriptionFromDB,
  getSingleSubscriptionFromDB,
  deleteSubscriptionFromDB,
  updateSubscriptionInDB,
};
