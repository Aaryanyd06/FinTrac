import express from "express";
import {
  getUser,
  googleLogin,
  loginUser,
  registerUser,
  updateProfile,
  changePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import { authenticateToken } from "../middlewares/jwt.js";

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/google-login").post(googleLogin);
router.route("/user").get(authenticateToken, getUser);
router.route("/update-profile").put(authenticateToken, updateProfile);

// Password management routes
router.route("/change-password").post(authenticateToken, changePassword);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password").post(resetPassword);

export default router;
