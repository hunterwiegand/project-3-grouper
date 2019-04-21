//Import the database tables
var db = require("../models");

//Export the routes
module.exports = function(app) {
    //Load the index page
    app.get("/", function(req,res) {
        db.Student.findAll().then (function (data) {
            res.render("index", {player: data });
        })
    });

    app.get("/create-game", function (req, res) {
        res.render("index");
      });
}