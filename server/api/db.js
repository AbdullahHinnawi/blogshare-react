const mongoose = require('mongoose');


export  function connectToDB(){
  const url = 'mongodb://localhost:27017/bloggeri';

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
