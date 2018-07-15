UPDATE drivers
SET name = $1, contactnumber = $2, address = $3, datehired = $4, unitnumber = $5
WHERE id = $6;