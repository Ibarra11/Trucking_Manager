SELECT * FROM income
WHERE owner_id = $1
ORDER BY year DESC, month , day ;