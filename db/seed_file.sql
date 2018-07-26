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



-- Contacts
CREATE TABLE contacts(
    id SERIAL PRIMARY KEY,
    name VARCHAR(40),
    company_name VARCHAR(40),
    phone VARCHAR(12),
    email VARCHAR(100),
    address VARCHAR(100)
)

INSERT INTO contacts (name, company_name, phone, email, address )
values 
('test1', 'test1', 'test1', 'test1', 'email', 'test1');


-- Payroll Table
CREATE TABLE payroll(
    id SERIAL PRIMARY KEY,
    date VARCHAR(20),
    driver_name VARCHAR (80),
    amount FLOAT
)


INSERT INTO payroll (date, driver_name, amount)
VALUES
('01/15/18', 'Israel Ibarra', 2000),
('02/12/18', 'Israel Ibarra', 1250),
('03/05/18', 'Israel Ibarra', 1245),
('04/20/18', 'Sergio Covarrubias', 881.91 ),
('05/01/18', 'Israel Ibarra', 1000),
('06/29/18', 'Israel Ibarra', 750),
('07/25/18', 'Israel Ibarra', 1425),
('08/04/18', 'Israel Ibarra', 1744),
('09/19/18', 'Israel Ibarra', 1250),
('10/12/18', 'Israel Ibarra', 1250),
('11/15/18', 'Israel Ibarra', 900),
('12/17/18', 'Israel Ibarra', 1250)

-- Expenses
INSERT INTO expenses (date, category, truck, amount)
VALUES
('01/10/18', 'Fuel', '7', 200.25),
('01/10/18', 'Repairs', '1994',135 ),
('01/10/18', 'Tires', '7', 345.54),
('01/10/18', 'Maintenance', '1994', 650.45),
('01/10/18', 'Fuel', '1994', 325.50),
('01/10/18', 'Tires', '1994', 175.45),
('01/10/18', 'Fuel', '7', 400),
('01/10/18', 'Repairs', '7', 1245.45),
('01/10/18', 'Fuel', '7', 150),
('01/10/18', 'Fuel', '1994', 400)

