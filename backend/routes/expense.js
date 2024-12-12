import express from 'express'
import { authenticateToken } from '../middlewares/jwt.js';
import { createExpense, deleteExpense, GetAllExpense, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();   

router.route("/createExpense").post(authenticateToken,createExpense);
router.route("/getAllExpense").get(authenticateToken,GetAllExpense);
router.route("/updateExpense").put(authenticateToken,updateExpense);
router.route("/deleteExpense").delete(authenticateToken,deleteExpense);

export default router;