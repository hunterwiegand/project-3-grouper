//Import the database tables
var db = require("../models");

//Export the routes
module.exports = function(app) {
    //Create a new Student
    app.post("/api/students", function (req, res) {
        db.Students.create(req.body).then(function (dbPlayers) {
            res.json(dbPlayers);
        });
    });
}