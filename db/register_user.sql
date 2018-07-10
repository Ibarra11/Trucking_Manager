INSERT INTO users (account_type, username, password, email)
VALUES($1, $2, $3, $4)
RETURNING *;