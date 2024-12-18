import express from "express";
import { SubscriptionControllers } from "./subscription.controller";

const router = express.Router();

router.get("/", SubscriptionControllers.getAllSubscription);
router.post("/create-subscription", SubscriptionControllers.createSubscription);
router.get("/:subscriptionId", SubscriptionControllers.getSingleSubscription);
router.delete("/:subscriptionId", SubscriptionControllers.deleteSubscription);
router.put("/:subscriptionId", SubscriptionControllers.updateSubscription);

export const SubscriptionRoutes = router;
