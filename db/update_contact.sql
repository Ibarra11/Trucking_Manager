UPDATE contacts
SET name = $2, company_name=$3, phone=$4, email=$5, address=$6
WHERE id = $1;