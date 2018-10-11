SELECT SUM(check_amount) 
FROM income
WHERE owner_id = $1 AND year = $2;