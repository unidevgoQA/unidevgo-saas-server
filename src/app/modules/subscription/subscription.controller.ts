import { Request, Response } from "express";
import { SubscriptionServices } from "./subscription.service";
import { SubscriptionValidation } from "./subscription.validation";

const createSubscription = async (req: Request, res: Response) => {
  try {
    const { subscription: subscriptionData } = req.body;

    // Data validation using Zod
    const zodParseData =
      SubscriptionValidation.SubscriptionValidationSchema.parse(
        subscriptionData
      );

    const result = await SubscriptionServices.createSubscriptionIntoDB(
      zodParseData
    );
    res.status(200).json({
      success: true,
      message: "Subscription added successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const getAllSubscription = async (req: Request, res: Response) => {
  try {
    const result = await SubscriptionServices.getAllSubscriptionFromDB();
    res.status(200).json({
      success: true,
      message: "Subscriptions Data Retrieved",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const getSingleSubscription = async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const result = await SubscriptionServices.getSingleSubscriptionFromDB(
      subscriptionId
    );
    res.status(200).json({
      success: true,
      message: "Subscription Retrieved Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { subscriptionId } = req.params;
    const result = await SubscriptionServices.deleteSubscriptionFromDB(
      subscriptionId
    );
    res.status(200).json({
      success: true,
      message: "Subscription deleted Successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

const updateSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subscriptionId } = req.params;
    const updateData = req.body.subscription;

    if (!updateData) {
      res.status(400).json({
        success: false,
        message: "No update data provided",
      });
      return;
    }

    const result = await SubscriptionServices.updateSubscriptionInDB(
      subscriptionId,
      updateData
    );

    if (!result) {
      res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Subscription updated successfully",
      data: result,
    });
  } catch (err) {
    console.error("Error updating Subscription:", err);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const SubscriptionControllers = {
  createSubscription,
  getAllSubscription,
  getSingleSubscription,
  deleteSubscription,
  updateSubscription,
};
