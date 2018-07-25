SELECT SUBSTRING(date, 1,2) AS "Month", SUM(amount)
FROM payroll
GROUP BY SUBSTRING(date, 1,2)
ORDER BY 1;