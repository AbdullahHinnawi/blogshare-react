import {StringUtil} from '../string-util';
import express from 'express';
const router = express.Router();
const mongoose = require('mongoose');
const methodOverride = require('method-override');

router.use(methodOverride('_method'));
import User from './user-model';


router.get('/api/users/:username', function(req, res){
  console.log('req.params.username');
  console.log(req.params.username);
  User.findOne({username: req.params.username},function(err, user){
    if(err) {
      return res.status(500).json({error: err});
    }else if(!user){
      return res.status(200).json({message: false});
    }else{
      return res.status(200).json({message:true});
    }
  });

});






router.post('/api/register',function(req,res) {
  console.log('req: ',req);
  const validation = validate(req.body);
  if (!validation.isValid) {
    return res.status(400).json({message: validation.message});
  }
  console.log('firstName: ',req.body.firstname);
  console.log('lastName: ',req.body.lastname);
  console.log('username: ',req.body.username);
  const user1 = new User({
    firstname: req.body.firstname.toLowerCase(),
    lastname: req.body.lastname.toLowerCase(),
    username: req.body.username,//.toLowerCase
    password: req.body.password,
  });

  user1.save(function(error, user) {
        console.log('REGISTERED USER:');
        console.log(user1);
        if (error) {
          if (error.code === 11000) {
            return res.status(403).json({message: 'User name is already registered!'})
          }
          console.log('REGISTERED USER:ERROOOOOOOOOR');
          console.log(error);
          res.status(500).json({error: error});
        }

        return res.status(200).json({
          message: 'The user has been registered!',
          user: user
        });


  });





 // res.send(user1);


});


function validate(body){
  let errors = '';
  if(StringUtil.isEmpty(body.username)){
    errors += 'Username is required.';
  }
  if(StringUtil.isEmpty(body.password)){
    errors += 'Password is required.'
  }
  if(StringUtil.isEmpty(body.firstname)){
    errors += 'First name is required.'
  }
  if(StringUtil.isEmpty(body.lastname)){
    errors += 'Last name is required.'
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  }
}
//module.exports= router;
export default router;