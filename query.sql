--sections for the joins in the schema
SELECT
e.id AS ID,
e.first_name AS First,
e.last_name AS Last,
e.role_id AS Role,
r.salary AS Salary,
m.last_name AS Manager,
d.name AS department

--Joining employee to itself
FROM employee e 
LEFT JOIN employee m
    ON e.manager_id = m.id
--Joining Role to employee table
LEFT JOIN role r ON e.role_id = r.title
--joining department to the role table
LEFT JOIN department d
    ON r.department_id = d.id