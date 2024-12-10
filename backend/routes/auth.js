import express from 'express'
import { googleLogin, loginUser, registerUser } from '../controllers/authController.js';


const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/google").post(googleLogin)

export default router;