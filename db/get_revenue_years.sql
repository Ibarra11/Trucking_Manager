
SELECT DISTINCT(year)
FROM expenses
WHERE owner_id = $1
UNION
SELECT DISTINCT(year)
FROM income
WHERE owner_id = $1
ORDER BY 1 DESC;

