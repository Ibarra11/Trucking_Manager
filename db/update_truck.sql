UPDATE trucks
SET make = $2, model = $3, year = $4, plate_number = $5, vin = $6
WHERE unit = $1;