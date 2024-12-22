import { Request, Response } from "express";
import { ZodError } from "zod";
import { SubscriptionServices } from "./subscription.service";
import { SubscriptionValidation } from "./subscription.validation";

// Utility function for centralized error handling
const handleError = (
  res: Response,
  error: any,
  statusCode = 500,
  defaultMessage = "Something went wrong"
) => {
  console.error("Error:", error); // Log error for debugging
  const message =
    error instanceof ZodError
      ? error.errors.map((e) => e.message).join(", ") // Format validation errors
      : error.message || defaultMessage;

  res.status(statusCode).json({
    success: false,
    message,
    error: error.stack || error, // Include stack trace in non-production environments
  });
};

// Controller to create a new subscription
const createSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subscription: subscriptionData } = req.body;

    // Validate subscription data using Zod schema
    const parsedData =
      SubscriptionValidation.SubscriptionValidationSchema.parse(
        subscriptionData
      );

    const result = await SubscriptionServices.createSubscriptionIntoDB(
      parsedData
    );

    res.status(201).json({
      success: true,
      message: "Subscription added successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      handleError(res, error, 400, "Validation error");
    } else {
      handleError(res, error);
    }
  }
};

// Controller to get all subscriptions
const getAllSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await SubscriptionServices.getAllSubscriptionFromDB();

    if (result.length === 0) {
      res.status(404).json({
        success: false,
        message: "No subscriptions found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Subscriptions retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to get a single subscription by ID
const getSingleSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subscriptionId } = req.params;

    const result = await SubscriptionServices.getSingleSubscriptionFromDB(
      subscriptionId
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
      message: "Subscription retrieved successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to delete a subscription
const deleteSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { subscriptionId } = req.params;

    const result = await SubscriptionServices.deleteSubscriptionFromDB(
      subscriptionId
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
      message: "Subscription deleted successfully",
      data: result,
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Controller to update a subscription
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
  } catch (error) {
    if (error instanceof ZodError) {
      handleError(res, error, 400, "Validation error");
    } else {
      handleError(res, error);
    }
  }
};

// Export all subscription controllers
export const SubscriptionControllers = {
  createSubscription,
  getAllSubscription,
  getSingleSubscription,
  deleteSubscription,
  updateSubscription,
};
