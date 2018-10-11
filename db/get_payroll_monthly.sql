SELECT month, SUM(payroll_amount)
FROM payroll
WHERE owner_id = $1 AND year = $2
GROUP by 1
ORDER BY 1 DESC;