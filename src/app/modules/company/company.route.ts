import express from "express";
import { CompanyControllers } from "./company.controller";

const router = express.Router();

router.post("/create-company", CompanyControllers.createCompany);

export const CompanyRoutes = router;
