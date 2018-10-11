SELECT Sum(payroll_amount) AS "Total"
FROM payroll
WHERE owner_id = $1 AND year = $2;