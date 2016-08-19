require("babel-register")({
    presets: ["react"]
});
// NPM Modules
var bodyParser = require('body-parser');
var express = require("express");
var logger = require("morgan");
var path = require("path");

var app = express();

// View Engine Setup
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

// Middlewares
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '../src')));
app.use(bodyParser.json());

// Routes
var homeRoutes = require("./routes/home_routes")(express);
app.use("/", homeRoutes);

// Handle Errors
app.use(function(err, req, res, next) {
    console.log(err);
});

// Start Server
var port = process.env.PORT || 8000;
app.listen(port);
console.log("LISTENING ON PORT: " + port);
