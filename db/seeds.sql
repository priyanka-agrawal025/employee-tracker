INSERT INTO departments (department_name)
VALUES 
    ("Sales"),
    ("Operations"),
    ("Human Resources"),
    ("Accounting");

INSERT INTO roles (role_title, role_salary, department_id)
VALUES
    ("Client Advisor", 40000, 1),
    ("Sales Manager", 70000, 1),
    ("Team Coordinator", 45000, 2),
    ("Operations Manager", 75000, 2),
    ("People Manager", 120000, 3),
    ("Accountant", 100000, 4),
    ("Accounting Manager", 150000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ("Jane", "Smith", 2, NULL),
    ("John", "Doe", 4, NULL),
    ("Jack", "Smalls", 1, 1),
    ("Marge", "Davids", 7, NULL);
    

