SELECT * 
FROM payroll
WHERE owner_id = $1
ORDER BY payroll_date;