SELECT name, SUM(amount) 
FROM income
FULL OUTER JOIN company
on income.company = company.name
GROUP BY name
ORDER BY 2 DESC NULLS LAST;