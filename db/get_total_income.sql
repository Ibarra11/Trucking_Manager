SELECT SUM(amount) 
FROM income
WHERE owner_id = $1;