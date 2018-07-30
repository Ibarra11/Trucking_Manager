SELECT name, SUM(amount) 
FROM payroll
FULL OUTER JOIN drivers
ON payroll.driver_name = drivers.name
GROUP BY name
ORDER BY 2 DESC NULLS LAST;