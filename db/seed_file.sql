-- User Table
CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    account_type VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(320) NOT NULL
)

INSERT INTO users (account_type, username, password, email)
VALUES('premium', 'aibarra13', 'Turlock209!', 'alan.ibarra209@gmail.com');



