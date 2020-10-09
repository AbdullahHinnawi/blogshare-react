const express = require('express');
const router = express.Router();
import {StringUtil} from '../string-util';
import * as auth from '../auth-service';

import User from './user-model';


const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');

const multer = require('multer');
//const upload = multer({dest: './public/images'});
const moment = require('moment');

const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));

// define Blog Schema
const BlogSchema = new mongoose.Schema({
  title: String,
  body: String,
  category: String,
  date: String,
  authorId: {type: mongoose.Schema.Types.ObjectID, ref: 'user'},
  author: String,
  imageFile: String,
  imageName: String,
  comments: Array
});

//  use timestamps to know when user was created or updated
BlogSchema.set('timestamps', true);

// compile schema to model
var Blog = mongoose.model('Blog', BlogSchema, 'blogs');

// Define categories Schema
const CategorySchema = new mongoose.Schema({
  name: String
});
//  use timestamps to know when user was created or updated
//CategorySchema.set('timestamps', true);
// compile schema to model
var Categories = mongoose.model('Categories', CategorySchema, 'categories');



// ****************** GRID FS STORAGE ****************** //
//const url = 'mongodb://localhost:27017/bloggeri';
const url = 'mongodb+srv://abdullah2:ykRykReK1uHl3ssw@notescluster.6avck.mongodb.net/blogshare-react?retryWrites=true&w=majority';

// useUnifiedTopology: true
const options = { native_parser: true,useUnifiedTopology: true, useNewUrlParser: true };

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

const promise = mongoose.connect(url, options);
const db = mongoose.connection;
//const db = mongoose.connection;
//const db = mongoose.createConnection(url, options);
db.on('error', console.error.bind(console, 'connection error:'));

//const db = require('monk')(url, options );
//const conn = mongoose.createConnection(url,options);

let gfs;
db.once('open',  () => {
  // init stream
   gfs = Grid(db.db, mongoose.mongo);
   gfs.collection('uploads');

});
// create storage engine
const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });

// **********************               ******************** //
// ********************** API ENDPOINTS ******************** //
// **********************               ******************** //

// Get all blogs
router.get('/api/blogs', auth.requireLogin, (req,res) =>{
 // console.log('req.headers: ',req.headers);
  Blog.find(function(err, blogs){
    if(err) return console.log(err);
    return res.status(200).json({blogs: blogs})
  }).populate('author,', 'username', 'user');
});

// Get MY BLOGS
router.get('/api/myblogs', auth.requireLogin, (req,res) =>{
  const authorId = req.query.userId;
  console.log('authorId:');
  console.log(authorId);

  Blog.find({authorId: authorId}, (error, blogs) =>{
    if(error){
      return res.status(500).json();
    }
    if(!blogs){
      return res.status(404).json();
    }
    return res.status(200).json({blogs: blogs});
  });
});

// Get all categories
router.get('/api/categories', auth.requireLogin, (req,res) =>{
  Categories.find(function(err, categories){
    if(err) return console.log(err);
    return res.status(200).json({categories: categories})
  });
});


// Save a category
router.post('/api/categories/add',auth.requireLogin, (req,res) =>{
  console.log('req.body:');
  console.log(req.body);
  Categories.find({}, (error,categories) =>{
    if(error){
      console.log("ERROR");
      return res.status(500).json({error: error});
    }
    if(categories.length < 14){
      console.log('Categories Number: ', categories.length);
      Categories.findOne({name: req.body.name.toLowerCase()}, (error, category) =>{
        if(error){
          console.log("ERROR");
          return res.status(500).json({error: error});
        }
        if(!category && req.body.name !==''){

          const category1 = new Categories({name: req.body.name.toLowerCase()});

          category1.save(function(err,category){
            if(err) return console.log(err);
            console.log(category.name + " saved to categories collection");
            return res.json({message: "Category Saved Successfully!"});

          });

        }else if(req.body.name ===''){
          console.log("The Input Field Is Empty!");
          return res.json({message:"The Input Field Is Empty!" });
        }else{
          console.log("This Category Is Already Exists!");
          // 'This Category Is Already Exists!'
          return res.json({message:"This Category Is Already Exists!" });
        }
      });

    }else{
      console.log("The Allowed Number Of Categories Is 10." );
      return res.json({message:"The Allowed Number Of Categories Is 10." });
    }
  });



});

// Get a category
router.get('/api/categories/show/:category', auth.requireLogin, (req,res)=>{
  Blog.find({category: req.params.category},function(err, blogs){
    if(err) return console.log(err);
    return res.status(200).json({blogs: blogs})
  }).populate('author,', 'username', 'user');
});

// ********    CREATE A NEW BLOG   *********
//auth.requireLogin: every time the user tries to access this endpoint
//it will run, check for the token and make sure that the
// user is logged in, if the user is logged in, it will return the token
router.post('/api/blogs', auth.requireLogin,upload.single('imageFile'), (req,res) =>{
 // res.json({file: req.file});
 // res.redirect('http://localhost:8080/');
  console.log('req.file####');
  console.log(req.file);
  console.log('req.body####');
  console.log(req.body);


  //const id = '5e15e57d67daa4164622ebdb';
  const id = auth.getUserId(req);
  console.log(req);
  console.log('id%%%%%%%%%%%%');
  console.log(id);
  User.findOne({_id: id}, (error, user) =>{
    if(error && !user){
      return res.status(500).json();
    }
    console.log('USER');
    console.log(user);

    // a document istance
    let blog1 = new Blog({
      title: req.body.title,
      body : req.body.body,
      category : req.body.category,
      date : moment(new Date()).format('LLLL'),
      authorId : user._id,
      author: user.username,
      imageFile: req.file.filename,
      imageName: req.file.originalname
    });

    blog1.save(function(err,blog){
      if(err) return console.log(err);
      console.log(blog.title + " saved to blogs collection");
       res.send(blog);
    });

   // res.send(blog1);

  });




});
// route to /api/files
router.get('/api/files', (req,res) =>{
  gfs.files.find().toArray((err, files) =>{
    // ckeck if files
    if(!files || files.length === 0){
      return res.status(404).json({
        err:'no files exist'
      });
    }
    // Files exist
    return res.json(files);
  });

});

// route to /api/files/:filename
router.get('/api/files/:filename', (req,res) =>{
  gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
    // ckeck if file
    if(!file || file.length === 0){
      return res.status(404).json({
        err:'no file exist'
      });
    }
    // file exists
    return res.json(file);
  });
});

// route to /api/image/
router.get('/api/image/:filename', (req,res) =>{
  gfs.files.findOne({filename: req.params.filename}, (err, file) =>{
    // ckeck if file
    if(!file || file.length === 0){
      return res.status(404).json({
        err:'no file exist'
      });
    }
      console.log('&&&&&&&&&&&&&&&& FILE: ', file);
      // check if image
      if (file.contentType === 'image/jpeg' || file.contentType ===
          'image/png') {
        // read output to browser
        var readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);

      } else {
        res.status(404).json({
          err: 'Not an image'
        });
      }


  });
});


// GET A BLOG BY ID for show endpoint
router.get('/api/blogs/show/:id',auth.requireLogin, function(req,res) {

  Blog.findOne({_id: req.params.id}, (error, blog) =>{
    if(error){
      return res.status(500).json();
    }
    if(!blog){
      return res.status(404).json();
    }
    return res.status(200).json({blog: blog});
  });

});

let commentId = 0;
// add a comment
router.post('/api/addcomment', auth.requireLogin, (req, res) =>{
  console.log('received comment');
  console.log(req.body);
  let comment= null;
  if(req.body.body !== ''){
    commentId++;
     comment ={
       _id: commentId,
       commentAuthor: req.body.commentAuthor,
       body: req.body.body,
       commentdate: moment(new Date()).format('LLL')
    };
    Blog.update({_id: req.body.blogId},{$push: {comments: comment}},{multi:true}, (error) =>{
      if(error){
        return res.status(500).json();
      }
      return res.status(200).json({message: 'The comment added successfully!'});
    });
  }



});



// GET A BLOG BY ID
router.get('/api/blogs/:id',auth.requireLogin, function(req,res) {

  Blog.findOne({_id: req.params.id}, (error, blog) =>{
    if(error){
      return res.status(500).json();
    }
    if(!blog){
      return res.status(404).json();
    }
    return res.status(200).json({blog: blog});
  });

});



// ********  UPDATE OR EDIT A BLOG  *********
router.put('/api/myblogs/:id',auth.requireLogin ,upload.single('imageFile'),function(req, res) {
  console.log('put request BODY ###');
  console.log(req.body);

  console.log('put request FILE ###');
  console.log(req.file);

  console.log('put Old Image ###');
  console.log(req.body.oldImage);

/*
  const id = auth.getUserId(req);
  console.log('userId'+id);
  User.findOne({_id:id}, (error, user) =>{
    if(error){
      return res.status(500).json();
    }
    if(!user){
      return res.status(404).json();
    }

    */
    if(req.file !== undefined) {
      console.log('Including An Image File');

      // FIRST:  delete the Old image from the database
      gfs.files.findOne({filename: req.body.oldImage}, (err, file) =>{
        // ckeck if file
        if(!file || file.length === 0){
          return res.status(404).json({
            err:'no file exist'
          });
        }
        // file exists
        console.log('The Old Image File: ', file);
        // remove the old image file from both chunks and files
        gfs.remove({_id: file._id, root: 'uploads'}, (err) =>{
          if(err){
            console.log('Error when DELETING the old image');
          }else{
            console.log('The Old Image Deleted Successfully!');
          }
        });

      });
      // After that update the Blog
      Blog.update({_id: req.body.blogId}, {
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        date:moment(new Date()).format('LLLL'),
        imageFile: req.file.filename,
        imageName: req.file.originalname
        },{multi:true}, (error) =>{
        if(error){
          console.log('Error');
          return res.status(500).json();

        }
        console.log('Changes Saved Successfully!');
        return res.status(204).json({message:'Changes Saved Successfully!'});

      });
    }else{
      console.log('Without an image file');

      Blog.update({_id: req.body.blogId}, {
        title: req.body.title,
        body: req.body.body,
        category: req.body.category,
        date:moment(new Date()).format('LLLL'),
      },{multi:true}, (error) =>{
        if(error){
          console.log('Error');
          return res.status(500).json();

        }
        console.log('Changes Saved Successfully!');
        return res.status(204).json({message:'Changes Saved Successfully!'});

      });
    }

});
// delete a blog
router.delete('/api/myblogs',auth.requireLogin, function(req, res) {
    const authorId = auth.getUserId(req);
    console.log('delete request: req.query.id:');
    console.log(req.query.id);
    Blog.findOne({_id: req.query.id}, (error, blog) =>{
      if(error){
        return res.status(500).json();
      }
      if(!blog){
        return res.status(404).json();
      }

      if(blog.authorId.toString() !== authorId){
        return res.status(403).json({massage:  "Not allowed to delete another user's blog"});
      }

      Blog.deleteOne({_id:req.query.id}, error =>{
        if(error){
          return res.status(500).json({message: error});
        }
        return res.status(204).json({message: 'Blog DELETED Successfully!'});
      });

      // then delete the image file from uploads.chunks and uploads.files
      gfs.files.findOne({filename: blog.imageFile}, (err, file) =>{
        // ckeck if file
        if(!file || file.length === 0){
          return res.status(404).json({
            err:'no file exist'
          });
        }
        // file exists
        console.log('The Old Image File: ', file);
        // remove the old image file from both chunks and files
        // you have tto put the root to delete the file successfully
        gfs.remove({_id: file._id, root: 'uploads'}, (err) =>{
          if(err){
            console.log('Error when DELETING the old image');
          }else{
            console.log('The Old Image Deleted Successfully!');
          }
        });

      });

    });


});




/*
router.use(function(err, req, res, next) {
  if(err.code === "LIMIT_FILE_TYPES"){
    res.status(422).json({error: "Only images are allowed"});
    return;
  }
  if(err.code === "LIMIT_FILE_SIZE"){
    res.status(422).json({error: `Too large file. Max size is ${MAX_SIZE / 1000} KB`});
    return;
  }

});
*/

//module.exports= router;
export default router;
