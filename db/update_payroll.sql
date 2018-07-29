UPDATE payroll
SET date = $2, driver_name = $3, amount = $4
WHERE id = $1; 