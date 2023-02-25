const fs = require('fs');

const getPosts = () => {
  const postsData = fs.readFileSync('./data/posts.json');
  return JSON.parse(postsData);
};

const getPublishedPostsSync = () => {
  const postsData = getPosts();
 return postsData.filter(post => post.published === true);
};

const getCategoriesSync = () => {
  const categoriesData = fs.readFileSync('./data/categories.json');
  return JSON.parse(categoriesData);
};

//module.exports = { getPosts, getPublishedPostsold, getCategoriesold };

let posts = [];
let categories = [];

function initialize() {
  return new Promise((resolve, reject) => {
    fs.readFile('./data/posts.json', 'utf8', (err, data) => {
      if (err) {
        reject('Unable to read posts.json');
      } else {
        try {
          posts = JSON.parse(data);
          fs.readFile('./data/categories.json', 'utf8', (err, data) => {
            if (err) {
              reject('Unable to read categories.json');
            } else {
              try {
                categories = JSON.parse(data);
                resolve();
              } catch (err) {
                reject('Error parsing categories.json');
              }
            }
          });
        } catch (err) {
          reject('Error parsing posts.json');
        }
      }
    });
  });
}

function getAllPosts() {
  return new Promise((resolve, reject) => {
    if (posts.length > 0) {
      resolve(posts);
    } else {
      reject('No results returned');
    }
  });
}

function getPublishedPosts() {
  return new Promise((resolve, reject) => {
    const publishedPosts = posts.filter(post => post.published === true);
    if (publishedPosts.length > 0) {
      resolve(publishedPosts);
    } else {
      reject('No results returned');
    }
  });
}

function getCategories() {
  return new Promise((resolve, reject) => {
    if (categories.length > 0) {
      resolve(categories);
    } else {
      reject('No results returned');
    }
  });
}

module.exports = {
initialize: initialize,
getAllPosts: getAllPosts,
getPublishedPosts:getPublishedPosts,
getCategories: getCategories,
getPosts: getPosts, 
getPublishedPostsSync:getPublishedPostsSync, 
getCategoriesSync:getCategoriesSync,
  };
