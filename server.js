/*********************************************************************************
*  WEB322 – Assignment 02
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part *  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: _Shao Qiao____ Student ID: 145954210_ Date: 2023-02-03_
*
*  Online (Cyclic) Link:https://amused-pink-galoshes.cyclic.app
*
********************************************************************************/ 

var express = require("express");
var app = express();
var HTTP_PORT = process.env.PORT || 8080;
app.use(express.static('public'));
app.listen(HTTP_PORT, function() {
    console.log(`Express http server listening on 8080`);
  });
app.get('/', function(req, res) {
  res.redirect('/about');
});
app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/views/about.html');
});
//<script src="./blog-service.js" ></script>
const blogService = require('./blog-service.js');
//document.write("<script language=javascript src='blog-service.js'><\/script>");
//kill -9 <8080>
app.get('/blog', function(req, res) {
  res.sendFile(__dirname + '/data/posts.json');
})
app.get('/posts', function(req, res) {
  res.sendFile(__dirname + '/data/posts.json');
})
app.get('/categories', function(req, res) {
  res.sendFile(__dirname + '/data/categories.json');
})
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});
