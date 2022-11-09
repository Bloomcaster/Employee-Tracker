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
    connection.query('SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS Role, r.salary AS Salary, mngr.last_name AS Manager, dpt.name AS Department FROM employee emp LEFT JOIN employee mngr ON emp.manager_id = mngr.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department pdt ON r.department_id = dpt.id', 
    function(err, results){
        console.table(results);
        start();
    });

    
}

function viewByDepartment() {
    connection.query('SELECT * FROM department', function(err, results) {
        if(err) throw err;
        //prompting user after the department is chosen
        inquirer
        .prompt([
            {
                name: 'choice',
                type: 'rawlist',
                choices: function(){
                    let choiceArr = [];
                    for(i=0; i< results.length; i++){
                        choiceArr.push(results[i].name);
                    }
                    return choiceArr;
                },
                message: 'Select department please'
            }
        ]).then(function(answer){
            connection.query(
                'SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS ROle, r.salary AS Salary, mngr.last_name AS Manager, dpt.name AS Department FROM employee emp LEFT JOIN employee mngr ON emp.manager_id = mngr.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dpt ON r.department_id = dpt.id WHERE dpt.name =?',
                [answer.choice], function(err, results)
             
            {
                if(err) throw err;
                console.table(results);
                start();
            }
         )
    });
});
}

//database for all departments, then when have gotten roles, prompt user
function viewByRole(){
    connection.query('SELECT title FROM role', function(err, results) {
        if(err) throw err;
        inquirer
        .prompt([
        {
            name: 'choice',
            type: 'rawlist',
            choices: function() {
                const choiceArr = [];
                for(i=0; i< results.length; i++) {
                    choiceArr.push(reuslts[i].title);
                }
                return choiceArr;
            },
            message: 'Select role'
        }
        ]).then(function(answer) {
            console.log(answer.choice);
            connection.query(
                'SELECT emp.id AS ID, emp.first_name AS First, emp.last_name AS Last, emp.role_id AS ROle, r.salary AS Salary, mngr.last_name AS Manager, dpt.name AS Department FROM employee emp LEFT JOIN employee mngr ON emp.manager_id = mngr.id LEFT JOIN role r ON emp.role_id = r.title LEFT JOIN department dpt ON r.department_id = dpt.id WHERE dpt.name =?',
                [answer.choice], function(err, results) {
                    if(err) throw err;
                    console.table(results);
                    start();
                }
            )
        });
    });
}