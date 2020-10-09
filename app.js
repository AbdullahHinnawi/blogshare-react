const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
//const multer = require('multer');
const path = require('path');
const serveStatic = require('serve-static');

/*
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var createError = require('http-errors');
*/



const app = express();
app.use(serveStatic(__dirname + "/dist"));
//process.env.NODE_ENV = 'production';
app.get('/', function(req, res) {
  if(process.env.NODE_ENV !== 'production'){
    return res.send('Running server in development mode');
  }else{
    console.log('Else implemented to redirect to index.html');
    return res.sendFile('/dist/index.html', {root: __dirname + '/dist'});
  }
});


app.use(express.static(path.join(__dirname, 'public')));

//app.use(cookieParser);
app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());


import {connectToDB} from './server/api/db';
connectToDB();

//const registerRoutes= require('./api/register-routes');
//const authRoutes= require('./api/auth-routes');
//const userRoutes= require('./api/user-routes');
//const blogsRoutes= require('./api/blogs-routes');



import registerRoutes from './server/api/register-routes';
import authRoutes from './server/api/auth-routes';
import blogsRoutes from './server/api/blogs-routes';
//import userRoutes from './api/user-routes';

app.use(blogsRoutes);
app.use(registerRoutes);
//app.use(userRoutes);
app.use(authRoutes);



// in production it will take the built folder which is a dist and it will serve it a static content

// PORT must be in capital letters
const port = process.env.PORT || 3000;
console.log("Used port: ", port);
//  "sharp": "^0.23.3",

app.use(express.static(__dirname + "/dist/"));

// Catch-all redirects every request '/*' to index.html
// you can use '/*' instead of /.*/


app.get('*', function (req, res) {
  const index = path.join(__dirname, 'build', 'index.html');
  res.sendFile(index);
  console.log("get * implemented, line 79");
});


if(process.env.NODE_ENV === undefined){
  process.env.NODE_ENV = "development";

}

app.listen(port, () => console.log(`Blogshare app listening on port ${port} in ${process.env.NODE_ENV} mode!`));