import express from "express";
import { CompanyControllers } from "./company.controller";

const router = express.Router();

router.post("/create-company", CompanyControllers.createCompany);
router.get("/", CompanyControllers.getAllCompanies);
router.get("/:companyId", CompanyControllers.getSingleCompany);

export const CompanyRoutes = router;
