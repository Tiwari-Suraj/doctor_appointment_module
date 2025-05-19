import express from "express";
import upload from "../middleware/upload.js";
import { addDoctor, allDoctors, apoointmentsAdmin, loginAdmin, adminDashbord } from "../controllers/adminController.js";
import authAdmin from "../middleware/authAdmin.js";
import { changeAvailablity } from "../controllers/doctorControllers.js";

const router = express.Router();



router.post("/add-doctor", authAdmin, upload.single("image"), addDoctor);
router.post("/login", loginAdmin);
router.post("/all-doctors", authAdmin, allDoctors);
router.post("/change-availability", authAdmin, changeAvailablity);
router.get("/appintments", authAdmin, apoointmentsAdmin);
router.get("/dashboard", authAdmin, adminDashbord);


export default router;
