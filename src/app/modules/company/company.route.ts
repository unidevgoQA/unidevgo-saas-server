import express from "express";
import { CompanyControllers } from "./company.controller";

const router = express.Router();

router.get("/", CompanyControllers.getAllCompanies);
router.post("/create-company", CompanyControllers.createCompany);
router.get("/:companyId", CompanyControllers.getSingleCompany);
router.delete("/:companyId", CompanyControllers.deleteCompany);
router.put("/:companyId", CompanyControllers.updateCompany);
router.post("/login", CompanyControllers.loginCompany);

export const CompanyRoutes = router;
