SELECT * FROM expenses
WHERE owner_id = $1
ORDER BY year DESC, month DESC, day DESC;