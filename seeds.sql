INSERT INTO department(name)
VALUES  ("Psychology"), 
        ("Nutrition"), 
        ("Tech Support"), 
        ("Management");

INSERT INTO role(title, salary, department_id)
VALUES  ("Chef", 75000, 1), 
        ("Headmaster", 1000000, 2), 
        ("Web Security", 126000, 3), 
        ("Professor", 95000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Deanna", "Troi", "Professor", 4), 
        ("Nee", "Lix", "Chef", null), 
        ("Geordi", "LaForge", "Web Security", 3),
        ("JeanLuc", "Picard", "Headmaster", 2);