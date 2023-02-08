const fs = require("fs");
let posts = [];
let categories = [];
function initialize() {
  return new Promise(function(resolve, reject) {
    fs.readFile("./data/posts.json", "utf8", function(err, data) {
      if (err) {
        reject("unable to read file");
        return;
      }

      posts = JSON.parse(data);

      fs.readFile("./data/categories.json", "utf8", function(err, data) {
        if (err) {
          reject("unable to read file");
          return;
        }

        categories = JSON.parse(data);
        resolve("succeed read files");
      });
    });
  });
};

function getAllPosts () {
  return new Promise((resolve, reject) => {
    if (posts.length == 0) {
      reject("no results return");
      return;
    }

    resolve(posts);
  });
};
function getPublishedPosts () {
    return new Promise((resolve, reject) => {
      const publishedPosts = posts.filter(post => post.published ==true);
  
      if (publishedPosts.length == 0) {
        reject("no results return");
        return;
      }
  
      resolve(publishedPosts);
    });
  };
  
  function getCategories(){
    return new Promise((resolve, reject) => {
      if (categories.length == 0) {
        reject("no results return");
        return;
      }
  
      resolve(categories);
    });
  };

  
