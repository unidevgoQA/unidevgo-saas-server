import express from "express";
import { AdminControllers } from "./admin.controller";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins);
router.post("/create-admin", AdminControllers.createAdmin);
router.get("/:adminId", AdminControllers.getAdminById);
router.put("/:adminId", AdminControllers.updateAdmin);
router.delete("/:adminId", AdminControllers.deleteAdmin);
router.post("/login", AdminControllers.loginAdmin);
router.put("/update-password/:adminId", AdminControllers.updatePassword);

export const AdminRoutes = router;
