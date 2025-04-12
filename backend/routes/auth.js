import express from 'express'
import { getUser, googleLogin, loginUser, registerUser, updateProfile } from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/jwt.js';

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/google").post(googleLogin);
router.route("/getUser").get(authenticateToken,getUser);
router.route("/updateProfile").put(authenticateToken, updateProfile);

export default router;