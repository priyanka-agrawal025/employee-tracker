const inquirer = require('inquirer');
// const cTable = require('console.table');

inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do? Choose an option:',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee'
            ]
        }
    ])
    .then((answers) => {
        console.log(answers);
        switch (answers.mainMenu) {
            case "View all departments":
                fetch('http://localhost:3001/api/departments')
                    .then(response => response.json())
                    .then(error => console.error(error))
                    .then(answers => console.table(answers));
                break;
            case "View all roles":
                fetch('http://localhost:3001/api/roles')
                    .then(response => response.json())
                    .then(error => console.error(error))
                    .then(answers => console.log(answers));
                break;
            case "View all employees":
                fetch('http://localhost:3001/api/employees')
                    .then(response => response.json())
                    .then(error => console.error(error))
                    .then(answers => console.log(answers));
                break;
            case "Add a department":
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Please enter the name of the department'
                    }
                ])
                    .then((answers) => {
                        fetch('http://localhost:3001/api/department', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(answers)
                        });
                    });
                break;
            case "Add a role":
                fetch('http://localhost:3001/api/departments')
                    .then(response => response.json())
                    .then(data => {
                        const choices = data.map(result => {
                            return {
                                name: result.department,
                                value: result.id
                            };
                        });
                        console.log(choices);
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'roleTitle',
                                message: 'Please enter the name of the role'
                            },
                            {
                                type: 'input',
                                name: 'roleSalary',
                                message: 'Please enter the salary amount for this role'
                            },
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Please enter the name of the department this role belongs to',
                                choices: choices
                            }
                        ]).then((answers) => {
                            console.log(answers)
                            fetch('http://localhost:3001/api/role', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(answers)
                            });
                        })
                    });
                break;
            case "Add an employee":
                fetch('http://localhost:3001/api/roles')
                    .then(response => response.json())
                    .then(data => {
                        const choices = data.map(result => {
                            return {
                                name: result.role,
                                value: result.id
                            };
                        });
                        console.log(choices);
                        inquirer.prompt([
                            {
                                type: 'input',
                                name: 'firstName',
                                message: 'Please enter the first name of the employee'
                            },
                            {
                                type: 'input',
                                name: 'lastName',
                                message: 'Please enter the last name of the employee'
                            },
                            {
                                type: 'list',
                                name: 'roleId',
                                message: 'Please choose this employee role',
                                choices: choices
                            }
                        ]).then((answers) => {
                            console.log(answers)
                            fetch('http://localhost:3001/api/role', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(answers)
                            });
                        })
                    });
                break;
        }
    });

