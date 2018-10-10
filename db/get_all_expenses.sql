SELECT * FROM expenses
WHERE owner_id = $1
ORDER BY expense_date DESC;