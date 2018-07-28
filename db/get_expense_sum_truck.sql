SELECT unit, SUM(amount) as "total"
FROM trucks
FULL OUTER JOIN expenses
ON trucks.unit = expenses.truck
GROUP BY unit
ORDER BY 2  DESC NULLS LAST;