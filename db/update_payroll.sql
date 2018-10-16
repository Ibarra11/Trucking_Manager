UPDATE payroll
SET month = $3, day=$4, year=$5, payroll_amount=$6, driver_name=$7
WHERE payroll_id = $1 AND owner_id = $2; 