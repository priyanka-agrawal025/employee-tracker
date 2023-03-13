// Import and require Express
const express = require('express');
// Import and require Mysql2
const mysql = require('mysql2');

// Setting the PORT
const PORT = process.env.PORT || 3001;
// Initializing Express
const app = express();

// Express middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connecting to the database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'pri401087',
        database: 'employee_db'
    },
    console.log(`Connected to the employee_db database`)
);

// View all departments
app.get('/api/departments', (req, res) => {
    const sql = `SELECT id, department_name AS department FROM departments`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.send(rows)
    });
});

// View all roles
app.get('/api/roles', (req, res) => {
    const sql = `SELECT id, role_title, role_salary, department_id FROM roles`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.send(rows);
    });
});
// View all employees
app.get('/api/employees', (req, res) => {
    const sql = `SELECT id, first_name, last_name, role_id, manager_id FROM employees`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.send(rows);
    });
});

// Add a department
app.post('/api/department', (req, res) => {
    const userInput = req.body;
    const sql = `IF NOT EXISTS (SELECT 1 FROM departments WHERE department_name = "${userInput.department}") INSERT INTO departments (department_name) VALUES ("${userInput.department}")`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'query successful',
            data: rows
        });
    });
});

// Add a role
app.post('/api/role', (req, res) => {
    let userInput = req.body;
    const sql = `INSERT INTO roles (role_title, role_salary, department_id) VALUES ("${userInput.roleTitle}", "${userInput.roleSalary}", "${userInput.departmentId}")`;

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'query successful',
            data: rows
        });
    });
});

// Add an employee
app.post('/api/employee', (req, res) => {
    let userInput = req.body;
    const sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES ("${userInput.firstName}", "${userInput.lastName}", "${userInput.roleId}")`;
    console.log(sql);

    db.query(sql, (err, rows) => {
        if(err) {
            res.status(500).json({ err: err.message });
            return;
        }
        res.json({
            message: 'query successful',
            data: rows
        });
    });
});


//Listening at PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});