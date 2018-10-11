SELECT company_name, SUM(check_amount) 
FROM income
WHERE owner_id = $1 AND year = $2
GROUP BY company_name
ORDER BY 2 DESC;