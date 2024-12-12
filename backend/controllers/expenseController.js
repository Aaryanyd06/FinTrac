import Expense from "../models/Expense.js";

export const createExpense = async(req, res) =>{
    const {category, amount, description, date} = req.body;

    try {
        const expense = new Expense({
            userId: req.user.id,
            category,
            amount,
            description,
            date
        })
        await expense.save();
        res.status(201).json(expense);
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const GetAllExpense = async (req,res) => {
    try {
        const expense = await Expense.find({userId: req.user.id});

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


export const updateExpense = async (req, res) => {
    try {
        const expense = await Expense.findByIdAndUpdate(
            req.params.id,
            {...req.body},
            {new: true}
        )

        res.status(200).json(expense)

    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}



export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Expense deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}