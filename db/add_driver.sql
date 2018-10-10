INSERT INTO drivers (owner_id, name, contact_number, address, date_hired, unit_number)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;