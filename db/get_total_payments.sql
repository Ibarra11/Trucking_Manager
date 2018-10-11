SELECT COUNT(*)
FROM payroll
WHERE owner_id = $1 AND year = $2;