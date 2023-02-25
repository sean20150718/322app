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
const blogService = require('./blog-service');
const { initialize } = require('./blog-service');
app.get('/', function(req, res) {
  res.redirect('/about');
});
app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/views/about.html');
});
app.get('/blog', (req, res) => {
  const posts = blogService.getPublishedPostsSync();
  res.send(posts);
});

app.get('/posts', (req, res) => {
  const posts = blogService.getPosts();
  res.send(posts);
});

//app.get('/categories', (req, res) => {
 // const categories = blogService.getCategoriesSync();
  //res.send(categories);
//});
app.get('/categories', (req, res) => {
  try {
    const categories = blogService.getCategoriesSync();
    res.send(categories);
  } catch (err) {
    res.send({ message: err.message });
  }
});
app.get('*', (req, res) => {
  res.status(404).send('Page not found');
});
initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server is listening on port ${HTTP_PORT}`);
    });
  })
  .catch((error) => {
    console.log(`Failed to initialize data: ${error}`);
  });
