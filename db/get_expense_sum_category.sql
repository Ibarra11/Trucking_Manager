SELECT type, SUM(amount)
FROM expenses
FULL OUTER JOIN category
ON expenses.category = category.type
GROUP BY type
ORDER BY sum DESC NULLS LAST;