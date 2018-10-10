SELECT * FROM income
WHERE owner_id = $1
ORDER BY check_date DESC;