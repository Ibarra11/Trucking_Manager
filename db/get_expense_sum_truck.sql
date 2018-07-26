SELECT truck, SUM(amount)
FROM expenses
GROUP BY truck
ORDER BY truck DESC;