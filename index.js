// requirements
var express = require("express");
var app = express();
var ejs = require('ejs');
app.set('view engine', 'ejs');
var mysqlDAO = require("./mysqlDAO");
var mongo = require("./mongoDAO");
const { check, validationResult } = require('express-validator');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))

//listens for get request
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/home.html")
})

//gets list of students
app.get("/students", (req, res) => {
    mysqlDAO.getStudents()
        .then((result) => {
            res.render("showStudents", { students: result });
        })
        //displays errors
        .catch((error) => {
            res.send('<h3> Error Message: <br/> ' + error.errno + " " + error.sqlMessage + ".")
        })
})

//deleting students from the list
app.get('/students/delete/:sid', (req, res) => {
    mysqlDAO.deleteStudent(req.params.sid)
        .then((result) => {
            if (result.length == 0) {
                res.send('<h1>Cant find student with id = ' + req.params.sid + '</h1> <p><a href="/">Home</p>')
            }
            else {
                //redirects to student page if successful
                res.redirect("/students");
            }
        })
        .catch((error) => {
            //sends error if match isnt found
            res.send('<h1>Error: ' + req.params.sid + ' has associated modules, student cannot be deleted</h1> <p><a href="/">Home</p>');
        })
})

//Get for adding students
app.get('/addStudent', (req, res) => {
    res.render("addStudent", { errors: undefined, sid: undefined, name: undefined, gpa: undefined });
})

// Listens for POST request to '/addStudent' (from addStudent.ejs)
app.post('/addStudent',
    [
        // Middleware function to run before module is updated (CONDITIONS)
        check('sid').isLength({ min: 4 }).withMessage("Student ID must be 4 characters"),
        check('name').isLength({ min: 5 }).withMessage("Name must have a minimum of 5 characters"),
        check('gpa').isFloat({ min: 0.0, max: 4.0 }).withMessage("GPA must be between 0.0 & 4.0")
    ],
    (req, res) => {
        var errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render('addStudent', { errors: errors.errors, sid: req.body.sid, name: req.body.name, gpa: req.body.gpa });
        }
        else {
            mysqlDAO.addStudent(req.body)
                .then((data) => {
                    res.redirect("/students");
                })
                .catch((error) => {
                    err = { msg: "Error: " + error.message };
                    errors = [];
                    errors.push(err);
                    res.render('addStudent', { errors: errors, sid: req.body.sid, name: req.body.name, gpa: req.body.gpa });
                })
        }
    })

//get for modules
app.get('/modules', (req, res) => {
    mysqlDAO.getModules()
        .then((result) => {

            res.render("showModules", { modules: result });
        })
        .catch((error) => {

            // Else, log error message onscreen and a link back to the home page
            res.send('<h1>Error occured while retrieving modules, ensure mysqlDAO resultbase is in use/exists</h1> <p><a href="/">Home</p>');
        })
})

//edits module
app.get('/module/edit/:mid', (req, res) => {
    mysqlDAO.getModule(req.params.mid)
        .then((result) => {
    // If user enters incorrect url
            if (result.length == 0) {
                //Log error message onscreen and a link back to the home page
                res.send('<h1>No such module with id = ' + req.params.mid + '</h1> <p><a href="/">Home</p>')
            }
            else {
                res.render("editModule", { errors: undefined, module: result[0] });
            }

        })
        .catch((error) => {
            res.send('<h1>Error occured while retrieving specified module</h1> <p><a href="/">Home</p>');
        })

    app.post("/module/edit/:mid",
        [
            //updating module
            check('name').isLength({ min: 5 }).withMessage("Module name must be at least 5 characters"),
            check('credits').isIn([5, 10, 15]).withMessage("Credits can only be 5, 10 or 15")

        ],
        (req, res) => {

            //gets list of errors
            var errors = validationResult(req);
            if (!errors.isEmpty()) {
                // Reload the editModule page with list of errors
                res.render('editModule', { errors: errors.errors, module: req.body });
            }
            else {
                mysqlDAO.updateModule(req.body)
                    .then((result) => {
                        res.redirect('/modules');
                    })
                    .catch((error) => {
                        res.send('<h1>Cannot update module ' + error + '</h1> <p><a href="/">Home</p>')
                    })
            }
        }
    )
})


app.get('/module/students/:mid', (req, res) => {
    mysqlDAO.listModule(req.params.mid)
        .then((result) => {
            if (result.length == 0) {
                res.send('<h1>No student is currently studying this module</h1> <p><a href="/">Home</p>')
            }
            else {
                res.render("studentStudy", { mid: req.params.mid, students: result })
            }
        })
        .catch((error) => {
            res.send('<h1>Cannot retrieve list of students studying ' + req.params.mid + '</h1> <p><a href="/">Home</p>');
        })
})
   
//Mongo

//get request for lecturers
app.get('/lecturers', (req, res) => {
    mongo.getLecturers()
        .then((result) => {
            res.render("showLecturers", { lecturers: result })
        })
        .catch((error) => {
            res.send(error);
        })
})

//adds lecturer
app.get('/addLecturer', (req, res) => {
    res.render("addLecturer", { errors: undefined, _id: undefined, name: undefined, dept: undefined });
})

app.post('/addLecturer',
    [
        //middleware function
        check('_id').isLength({ min: 4 }).withMessage("Lecturer ID must be 4 characters"),
        check('name').isLength({ min: 5 }).withMessage("Name must be atleast 5 characters"),
        check('dept').isLength({ min: 3 }).withMessage("Dept must be 3 characters")
    ],
    (req, res) => {

        //gets list of errors
        var errors = validationResult(req);
// if errors found
        if (!errors.isEmpty()) {
            res.render('addLecturer', { errors: errors.errors, _id: req.body._id, name: req.body.name, dept: req.body.dept });
        }

        mysqlDAO.getDept(req.body.dept)
            .then((result) => {

                //if dept exists
                if (result.length != 0) {

                    //adds new lecturer
                    mongo.addLecturer(req.body)
                        .then((result) => {
                            res.redirect("/lecturers");
                        })
                        .catch((error) => {
                            //if error is 11000
                            if (error.code == 11000) {
                                err = { notify: "_id already exists" };
                                res.render('addLecturer', { errors: errors, _id: req.body._id, name: req.body.name, dept: req.body.dept });
                            }

                            console.log(error.message);
                        })
                }
                else if (errors.isEmpty() && result.length == 0) {
                    err = { notify: "Dept doesn't exist" };
                    res.render('addLecturer', { errors: errors, _id: req.body._id, name: req.body.name, dept: req.body.dept });
                }
            })
            .catch((error) => {
                console.log("" + error)

            })
    })

    //listens for collection
app.listen(3000, () => {
    console.log("Listening on port 3000")
})