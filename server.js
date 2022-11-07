//dependecies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
//const { start } = require('repl');

//connection for sql database
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'password',
    database: 'employee_db'

});

//mysql database and server connection
connection.connect(function(err) {
    if(err) throw err;
    console.log("The SQL connection... ITS ALIVE!!");

    start();
});

//using CASE expression in sql to go through conditions to see if they are met and a switch case depending on answers
function start() {
    inquirer
    .prompt ([
        {
            type: 'list',
            name: 'start',
            message: "Welcome to Star Systems database with information on departments, employees and employee roles. What would you like to choose?",
            choices: ['View', 'Update', 'Add', 'Exit']
        }
    ]).then (function(res) {
        switch(res.start){
            case 'View':
                view();
                break;
            case 'Update':
                updateEmployee();
                break;
            case 'Add':
                add();
                break;
            case 'Exit':
                console.log("Live long and have a productive day");
                console.log('----------------------------------------');
                break;
                default:
                    console.log('default');

            
        }
    });
}

//view function
function view() {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'view',
            message: 'Please choose one to view',
            choices: ['Employee Roster', 'By Role', 'By Department']
        }
    ]).then(function(res){
        switch(res.view){
            case 'Employee Roster':
                viewEmployeeRoster();
                break;
            case 'By role':
                viewByRole();
            case 'By Department':
                viewByDepartment();
                default:
                    console.log('default');
        }
    });
}

//view function breakdown
function view() {

}
function viewEmployeeRoster() {
    connection.query('')
}