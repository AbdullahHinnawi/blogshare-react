const mongoose = require('mongoose');


export  function connectToDB(){
  //const url = 'mongodb://localhost:27017/bloggeri';
  const url = 'mongodb+srv://abdullah2:ykRykReK1uHl3ssw@notescluster.6avck.mongodb.net/blogshare-react?retryWrites=true&w=majority';

  const options = { native_parser: true,useUnifiedTopology: true, useNewUrlParser: true };

      mongoose.connect(url, options, error => {
        if(error){
          console.log('Unable to connect to database');
          throw error;
        } else{
          console.log('connected to MongoDB!');
        }
      });
  }
