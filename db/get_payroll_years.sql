SELECT DISTINCT(year) 
FROM payroll
WHERE owner_id = $1
ORDER by 1 DESC;