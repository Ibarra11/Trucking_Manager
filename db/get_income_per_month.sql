SELECT month, SUM(check_amount)
FROM income
WHERE owner_id = $1 AND year = $2
GROUP BY 1 
ORDER  BY month DESC;