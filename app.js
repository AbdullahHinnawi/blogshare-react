const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');





const app = express();
app.use(serveStatic(__dirname + "/dist"));
//process.env.NODE_ENV = 'production';

//app.use(express.static(__dirname));
//app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function(req, res) {
  if(process.env.NODE_ENV !== 'production'){
    return res.send('Running server in development mode');
  }else{
    console.log('Else implemented to redirect to index.html');
    return res.sendFile(path.join(__dirname, 'build', 'index.html'));
  }
});


app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.use(bodyParser.json());


import {connectToDB} from './server/api/db';
connectToDB();




import registerRoutes from './server/api/register-routes';
import authRoutes from './server/api/auth-routes';
import blogsRoutes from './server/api/blogs-routes';
//import userRoutes from './api/user-routes';

app.use(blogsRoutes);
app.use(registerRoutes);
app.use(authRoutes);



// in production it will take the built folder which is a dist and it will serve it a static content

// PORT must be in capital letters
const port = process.env.PORT || 3000;
console.log("Used port: ", port);

app.use(express.static(__dirname + "/dist"));

// Catch-all redirects every request '/*' to index.html
// you can use '/*' instead of /.*/
app.get(/.*/ , function(req,res) {

  res.sendfile(__dirname + "/index.html");
  console.log("get/.*/ implemented");
});




if(process.env.NODE_ENV === undefined){
  process.env.NODE_ENV = "development";

}

app.listen(port, () => console.log(`Blogshare app listening on port ${port} in ${process.env.NODE_ENV} mode!`));