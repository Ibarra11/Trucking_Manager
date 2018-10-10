UPDATE income
SET check_date = $2, company = $3, amount = $4, check_number = $5
WHERE income_id = $1;