const MongoClient = require('mongodb').MongoClient;
var dbColl;
var lectureColl;
MongoClient.connect('mongodb://localhost:27017')
.then((client) =>{
    dbColl = client.db('lecturersDB')
    lectureColl = dbColl.lectureColl('lecturers')
})
.catch((error) =>{
    console.log(error.message)
})


var getLecturers = function () {
    return new Promise((resolve, reject) => {
        var cursor = lecturers.find().sort({ _id: 1 })
        cursor.toArray()
            .then((documents) => {
                console.log(documents)
                resolve(documents)
            })
            .catch((error) => {
                reject(error)
            })
    })
}

function addLecturer(newLecturer){
    return new Promise((resolve,reject) => {
        lectureColl.insertOne(newLecturer)
        .then((result) =>{
            resolve(result);
        })
        .catch((error) =>{
            reject(error);
        })
    })
}

//exports
module.exports = {getLecturers,addLecturer};