SELECT name, SUM(payroll_amount) 
FROM payroll,drivers
WHERE payroll.owner_id = $1 AND drivers.owner_id = $1 AND payroll.driver_name = drivers.name AND payroll.year = $2
GROUP BY name
ORDER BY 2 DESC NULLS LAST;