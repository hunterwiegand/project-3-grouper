//Import the config file that we have hidden in out dotenv
require("dotenv").config();

// Dependancys
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3030;

var http = require("http").Server(app);
var io = require("socket.io")(http);

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//Allow our static js and css files to be read on our html pages
app.use(express.static("public"));

// Handlebars
app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
  );
  app.set("view engine", "handlebars");

//Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app)

var syncOptions = {force: false};

//If we are testing, set syncOptions.force to true
// clearing the db
if(process.env.NODE_ENV === "test") {
    syncOptions.force = true;
}

//Socket.io connection

io.on("connection", function (socket) {
    //Add server socket listeners here
});

//Start the server while syncing our models
db.sequelize.sync(syncOptions).then(function () {
    var server = http.listen(PORT, function () {
        console.log("==> 🌎 Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});
//Export app
module.exports = app;
