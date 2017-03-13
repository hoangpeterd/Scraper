/* Scraping into DB (18.2.5)
 * ========================== */

// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");


// Initialize Express
var app = express();

var path = require("path");
app.use(express.static(path.join(__dirname, "/public/")));

// requiring handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// requiring routes
var routes = require("./controllers/controllers.js");
app.use("/", routes)

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});