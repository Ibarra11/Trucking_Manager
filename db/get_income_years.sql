SELECT DISTINCT(year)
FROM income
WHERE owner_id = $1
ORDER BY  1 DESC;