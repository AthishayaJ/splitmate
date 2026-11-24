const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS and JSON body parser middleware
app.use(cors());
app.use(express.json());

// In-memory expense store for rapid development
let expenses = [
    {
        id: 1,
        title: "Weekly Groceries",
        amount: 1500,
        paidBy: "Athishaya",
        splitBetween: ["Athishaya", "Kaviyan", "Rahul"],
        createdAt: new Date().toISOString()
    }
];

/**
 * Health check endpoint
 * Route: GET /
 */
app.get('/', (req, res) => {
    res.json({ status: "active", message: "SplitMate API Server is operational" });
});

/**
 * Fetch all registered expenses
 * Route: GET /api/expenses
 */
app.get('/api/expenses', (req, res) => {
    res.status(200).json({ success: true, count: expenses.length, data: expenses });
});

/**
 * Record a new expense
 * Route: POST /api/expenses
 */
app.post('/api/expenses', (req, res) => {
    const { title, amount, paidBy, splitBetween } = req.body;

    // Basic payload validation
    if (!title || !amount || !paidBy || !splitBetween || !splitBetween.length) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
    }

    const newExpense = {
        id: expenses.length + 1,
        title,
        amount: Number(amount),
        paidBy,
        splitBetween,
        createdAt: new Date().toISOString()
    };

    expenses.push(newExpense);
    res.status(201).json({ success: true, message: "Expense recorded successfully", data: newExpense });
});

// Initialize server listener
app.listen(PORT, () => {
    console.log(`[SplitMate] Server initialized and listening on http://localhost:${PORT}`);
});