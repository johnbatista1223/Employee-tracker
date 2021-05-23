const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'Lakers123%',
  database: 'employee_trackerDB',
});

connection.connect((err) => {
  if (err) throw err;
  console.log(`welcome to employee tracker`);
  start()
  // connection.end();
});

function start() {
  inquirer
    .prompt({
      name: 'action',
      type: 'list',
      message: ' What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Update employee role',
        'Delete employee',
        'EXIT'
      ]
    }).then(function (answer) {
      console.log(answer);
      switch (answer.action) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Update employee role':
          updateRole();
          break;
        case 'Delete employee':
          deleteEmployee();
          break;
        case 'EXIT':
          exitApp();
          break;
        default:
          break;
      }
    })
};
function viewEmployees() {
  let queryString = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department on role.department_id = department.id;";
  ;
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table('All Employees:', res);
    start()
  })
};
function viewDepartments() {
  let queryString = 'SELECT * FROM department';
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table('All Departments:', res);
    start()
  })
};
function viewRoles() {
  let queryString = 'SELECT * FROM role';
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    console.table('All Roles:', res);
    start()
  })
};
function addEmployee() {

  inquirer
    .prompt([{
      name: 'firstName',
      type: 'input',
      message: ' what is employee first name'
    },
    {
      name: 'lastName',
      type: 'input',
      message: ' what is employee last name'
    },
    {
      name: 'role',
      type: 'list',
      message: ' what is employee role',
      choices: [{ name: 'Web Developer', value: 1 }, { name: 'Accountant', value: 2 }, { name: 'Paralegal', value: 3 }, { name: 'Manager', value: 4 }, { name: 'Engineer', value: 5 }, { name: 'Sales-rep', value: 6 }]
    },
    ]).then(function (answer) {
      console.log(answer)
      let queryString = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${answer.firstName}","${answer.lastName}",${answer.role}, 1)`;
      connection.query(queryString, function (err, res) {
        if (err) throw err;
        viewEmployees()
      })
    })
}
function addDepartment() {
  inquirer
    .prompt([
      {
        name: 'Department',
        type: 'list',
        message: 'Which department would you like to add?',
        choices: ['Technology', 'Finance', 'Legal', 'Human Resources', 'Security', 'Sales',]
      }
    ]).then(function (answer) {
      connection.query(
        'INSERT INTO department SET ?',
        {
          name: answer.Department
        });
      var queryString = 'SELECT * FROM department';
      connection.query(queryString, function (err, res) {
        if (err) throw err;
        viewDepartments()
      })
    })
};
function addRole() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "employee title",
        name: "newTitle",
        choices: ['Web Developer', 'Accountant', 'Paralegal', 'Manager', 'Engineer', 'Sales-rep']
      },
      {
        type: "input",
        message: "enter employee salary",
        name: "salary"
      },
      {
        type: "input",
        message: "enter employee department id",
        name: "depId"
      }
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role SET ?",
        {
          title: answer.newTitle,
          salary: answer.salary,
          department_id: answer.depId
        },
        function (err, answer) {
          if (err) {
            throw err;
          }
          viewRoles()
        }
      );
    });
}
function updateRole() {
  let queryString = 'SELECT employee.first_name , employee.last_name ,employee.id  FROM employee';
  let updatedEmployeeList = [];
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    res.forEach((element) => {
      updatedEmployeeList.push(`${element.id} ${element.first_name} ${element.last_name}`);
      // console.log(updatedEmployeeList)
    })
    inquirer.prompt([
      {
        message: "which employee would you like to update?",
        type: "list",
        name: "name",
        choices: updatedEmployeeList
      }, {
        message: "enter the new role:",
        type: "list",
        name: "role_id",
        choices: [{ name: 'Web Developer', value: 1 }, { name: 'Accountant', value: 2 }, { name: 'Paralegal', value: 3 }, { name: 'Manager', value: 4 }, { name: 'Engineer', value: 5 }, { name: 'Sales-rep', value: 6 }]
      },
    ]).then(function (response) {
      connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [response.role_id, parseInt(response.name.charAt(0))], function (err, data) {
        viewEmployees()
      })
      
    })
  })
}
function deleteEmployee() {
  let queryString = 'SELECT employee.first_name , employee.last_name ,employee.id  FROM employee';
  let updatedEmployeeList = [];
  connection.query(queryString, function (err, res) {
    if (err) throw err;
    res.forEach((element) => {
      updatedEmployeeList.push(`${element.id} ${element.first_name} ${element.last_name}`);
      // console.log(updatedEmployeeList)
    })
    inquirer.prompt([
      {
        message: "which employee would you like to delete?",
        type: "list",
        name: "name",
        choices: updatedEmployeeList
      },
    ]).then(function (response) {
      connection.query("DELETE FROM employee WHERE ?", [response.first_name,response.last_name], function (err, data) {
        viewEmployees()
      })
      
    })
  })
}
// const deleteEmployee = () => {
//   console.log('DELETE FROM employee');
//   connection.query(
//     'DELETE FROM employee WHERE ?',
//     {
//       first_name: 'chocolate',
//       last_name:
//     },
//     (err, res) => {
//       if (err) throw err;
//      start()
//     }
//   );
// };


function exitApp() {
  connection.end();
  console.log("Have a good one!");

};