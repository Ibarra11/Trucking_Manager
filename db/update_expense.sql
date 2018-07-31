UPDATE expenses
SET date = $2, category = $3, truck = $4, amount = $5
WHERE id = $1;