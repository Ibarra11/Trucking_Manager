UPDATE drivers
SET name = $3, day_hired=$4, month_hired=$5, year_hired=$6, unit_number=$7
WHERE driver_id = $1 AND owner_id = $2;