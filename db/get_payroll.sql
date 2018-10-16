SELECT * FROM payroll 
WHERE owner_id = $1
ORDER BY month DESC, day DESC;