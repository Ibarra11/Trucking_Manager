SELECT category, SUM(amount)
FROM expenses
GROUP BY category
ORDER BY category;