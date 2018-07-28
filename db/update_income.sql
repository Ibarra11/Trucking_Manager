UPDATE income
SET date = $2, company = $3, amount = $4, check_number = $5
WHERE id = $1;