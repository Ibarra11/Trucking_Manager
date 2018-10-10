SELECT SUM(expense_amount)
FROM expenses
WHERE owner_id = $1;