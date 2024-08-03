import AuthController from "../controllers/authController.js";
import express from "express";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);

export default router;