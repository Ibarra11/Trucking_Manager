INSERT INTO drivers (name, contactnumber, address, datehired, unitnumber)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;