UPDATE trucks
SET  unit_number = $3,make = $4, model = $5, truck_year = $6, plate_number = $7, truck_vin = $8
WHERE owner_id = $1 AND truck_id = $2;