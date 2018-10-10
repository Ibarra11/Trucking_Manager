UPDATE expenses
SET expense_date = $2, expense_category = $3, unit_number = $4, expense_amount = $5
WHERE expense_id = $1;