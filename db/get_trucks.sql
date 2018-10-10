SELECT *
FROM trucks
WHERE owner_id = $1
ORDER BY truck_id ASC;