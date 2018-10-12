SELECT month, SUM(expense_amount)
FROM expenses
WHERE owner_id = $1 AND year=$2
GROUP BY 1
ORDER BY 1 DESC;