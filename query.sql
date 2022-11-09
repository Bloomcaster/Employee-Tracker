--ID sections for the joins in the schema
SELECT
emp.id AS ID,
emp.first_name AS First,
emp.last_name AS Last,
emp.role_id AS Role,
r.salary AS Salary,
mngr.last_name AS Manager,
dpt.name AS department

FROM employee emp 
LEFT JOIN employee mngr
    ON emp.manager_id = mngr.id
--Joining Role to employee table
LEFT JOIN role emp.role_id = r.title
--joining department to the role table
LEFT JOIN department dpt
    ON r.department_id = dpt.id