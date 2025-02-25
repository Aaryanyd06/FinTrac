import express from 'express'
import { authenticateToken } from '../middlewares/jwt.js';
import { addCategory, createExpense, deleteExpense, GetAllExpense, getBudget, getCategories, updateBudget, updateExpense } from '../controllers/expenseController.js';

const router = express.Router();   

router.route("/createExpense").post(authenticateToken,createExpense);
router.route("/getAllExpense").get(authenticateToken,GetAllExpense);
router.route("/updateExpense").put(authenticateToken,updateExpense);
router.route("/deleteExpense/:id").delete(authenticateToken,deleteExpense);

router.route("/updateBudget").put(authenticateToken, updateBudget);
router.route("/getBudget").get(authenticateToken, getBudget);

router.route("/categories").post(authenticateToken, addCategory);
router.route("/categories").get(authenticateToken, getCategories);


export default router;