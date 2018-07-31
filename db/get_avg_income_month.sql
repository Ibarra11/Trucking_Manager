WITH "month_table" AS(SELECT  SUBSTRING(SUBSTRING(date, 6), 1,2) AS "Month", Sum(amount) AS "total"
FROM income
GROUP BY SUBSTRING(SUBSTRING(date, 6), 1,2)
ORDER BY 1)

SELECT SUM(total) / Count(*) AS "Avg"
FROM month_table;

