// Initialize Express
var express = require("express");
var app = express();

var request = require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");

var Mnews = require("./../models/news.js");
var notes = require("./../models/notes.js");

// Database configuration with mongoose
var db = mongoose.connection;

// Main route (simple Hello World Message)
app.get("/", function (req, res) {
  res.render("index", {
    title: "news scraper"
  });
});

// Scrape data from one site and place it into the mongodb db
app.get("/scrape", function (req, res) {
  request("https://news.ycombinator.com/", function (error, response, html) {
    // Load the html body from request into cheerio
    var $ = cheerio.load(html);
    // Make a request for the news section of ycombinator
    var newsArray = [];
    // For each element with a "title" class
    $("td.title").each(function (i, element) {
      // Save the text of each link enclosed in the current element
      var title = $(this).children("a").text();
      // Save the href value of each link enclosed in the current element
      var link = $(this).children("a").attr("href");
      var news = {
        title: title,
        link: link
      }
      if (title) {
        newsArray.push(news);
      }
    });
    // This will send a "Scrape Complete" message to the browser
    res.json(newsArray);
  });
});

app.post("/save", function (req, res){
  console.log(req.body)
  var newNews = new Mnews(req.body);
  newNews.save(function(error, doc){
    if (error)
      res.send(error);
  })
});

app.post("/delete/:id", function (req, res){
  console.log(req.params.id)
})

app.get("/saved", function (req, res){
  Mnews.find({}, function(error, doc) {
    if (error) {
      res.send(error);
    } else {
      res.render("saved", {doc});
    }
  })
})

app.get("/favicon.ico", function (req, res) {
  res.send(204);
});

module.exports = app