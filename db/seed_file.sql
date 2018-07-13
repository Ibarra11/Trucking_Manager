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

--Drivers Tables
CREATE TABLE drivers(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60) NOT NULL,
    contactNumber VARCHAR(20),
    address VARCHAR(80),
    dateHired varchar(10),
    unitNumber INT REFERENCES trucks(unit)
);

INSERT INTO drivers (name, contactnumber, address, datehired, unitnumber)
VALUES ('Israel Ibarra', '209-4954509', '419 Wolfe Ave Turlock', '1-2-2018', 1947);

-- Truck
CREATE TABLE trucks(
    unit INT PRIMARY KEY,
    make VARCHAR(50),
    model VARCHAR(30),
    year int,
    plateNumber VARCHAR(12),
    vin VARCHAR(60)
);