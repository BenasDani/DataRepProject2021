var mysql = require('promise-mysql')
var pool;
mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'collegedb'
})
.then(result =>{
    pool = result;
})
.catch(error => {
    console.log("Pool error: " + error);
})

//query to return table
function getStudents(){
    return new Promise((resolve,reject) =>{
        pool.query("SELECT * from student")
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//function to delete student ID
function deleteStudent(sid){
    return new Promise((resolve,reject) =>{
        var myQuery = {
            sql: "DELETE from student WHERE sid = ?",
            values: [sid]
        }

        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//function to insert student record
function addStudent(newStudent){
    return new Promise((resolve,reject) =>{
        var myQuery = {
            sql: "INSERT into student (sid,name,gpa) values (?,?,?);",
            values: [newStudent.sid,newStudent.name,newStudent.gpa]
        }
        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}


//function to return all modules
function getModules(){
    return new Promise((resolve,reject) =>{
        pool.query("SELECT * from module")
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//function to return module
function getModule(mid){
    return new Promise((resolve,reject) =>{
        
        var myQuery = {
            sql: "SELECT * from module WHERE mid = ?",
            values: [mid]
        }
        
        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//function to update a moduke
function updateModule(updatedModule){
    return new Promise((resolve,reject) =>{
        var myQuery = {
            sql: "UPDATE module SET name = ?, credits = ? WHERE mid = ?",
            values: [updatedModule.name,updatedModule.credits,updatedModule.mid]
        }
        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}


function listModule(mid){
    return new Promise((resolve,reject) =>{
        
        var myQuery = { 
            sql: "SELECT m.mid,s.name,s.sid,s.name,s.gpa from student_module m INNER JOIN student s ON m.sid = s.sid WHERE m.mid = ?;",
            values: [mid]
        }
        
        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//returns id of dept name that record matches
function getDept(dept){
    return new Promise((resolve,reject) =>{
        
        var myQuery = { 
            sql: "SELECT * from dept WHERE did = ?",
            values: [dept]
        }
        
        pool.query(myQuery)
        .then((data) => {
            resolve(data);
        })
        .catch((error) => {
            reject(error);
        })
    })
}

//exports
module.exports = {getStudents, getModules, getModule, getDept, updateModule, deleteStudent, addStudent, listModule};