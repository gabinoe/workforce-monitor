// index.js
const inquirer = require('inquirer');
const connection = require('./db_config');

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to the database.\n');
  startApp();
});

function startApp() {
  inquirer.prompt({
    type: 'list',
    name: 'action',
    message: 'Select an action:',
    choices: [
      'View all departments',
      'View all roles',
      'View all employees',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Exit'
    ]
  }).then((answer) => {
    switch (answer.action) {
      case 'View all departments':
        viewAllDepartments();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmployees();
        break;
      case 'Add a department':
        addDepartment();
        break;
      case 'Add a role':
        addRole();
        break;
      case 'Add an employee':
        addEmployee();
        break;
      case 'Update an employee role':
        updateEmployeeRole();
        break;
      case 'Exit':
        connection.end();
        console.log('Exiting the application.');
        break;
    }
  });
}

function viewAllDepartments() {
  const query = 'SELECT * FROM departments';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('\nAll Departments:\n');
    console.table(results);
    startApp();
  });
}

function viewAllRoles() {
  const query = 'SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('\nAll Roles:\n');
    console.table(results);
    startApp();
  });
}

function viewAllEmployees() {
  const query = 'SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department, CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees LEFT JOIN roles ON employees.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id LEFT JOIN employees manager ON employees.manager_id = manager.id';
  connection.query(query, (err, results) => {
    if (err) throw err;
    console.log('\nAll Employees:\n');
    console.table(results);
    startApp();
  });
}

function addDepartment() {
  inquirer.prompt({
    type: 'input',
    name: 'name',
    message: 'Enter the name of the department:',
  }).then((answer) => {
    const query = 'INSERT INTO departments (name) VALUES (?)';
    connection.query(query, [answer.name], (err, results) => {
      if (err) throw err;
      console.log('Department added successfully!\n');
      startApp();
    });
  });
}

function addRole() {
  // You can prompt the user for role details (title, salary, department_id) here.
  // Then insert the role into the roles table in the database.
  console.log('Add Role functionality is not implemented in this example.');
  startApp();
}

function addEmployee() {
  // You can prompt the user for employee details (first_name, last_name, role_id, manager_id) here.
  // Then insert the employee into the employees table in the database.
  console.log('Add Employee functionality is not implemented in this example.');
  startApp();
}

function updateEmployeeRole() {
  // You can prompt the user for an employee to update and their new role here.
  // Then update the employee's role in the database.
  console.log('Update Employee Role functionality is not implemented in this example.');
  startApp();
}
