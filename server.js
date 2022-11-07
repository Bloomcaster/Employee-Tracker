//dependecies
const inquirer = require('inquirer');
const mysql = require('mysql');
const cTable = require('console.table');
const { start } = require('repl');

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