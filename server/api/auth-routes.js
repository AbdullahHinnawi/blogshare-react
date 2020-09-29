import {StringUtil} from '../string-util';
import express from 'express';
import User from './user-model';
import {generateJWT} from '../auth-service';
const router = express.Router();
//let router = require('express').Router;


router.post('/api/auth',function(req,res){
  const validation = validate(req.body);
  console.log('validation', validation);
  if(!validation.isValid){
    return res.status(400).json({message: validation.message});
  }
  //req.body.username.toLowerCase
  User.findOne({username: req.body.username},
      (error, user) =>{
          if (error){
            return res.status(500).json();
          }

          if(!user){
            return res.status(401).json({message:"UNAUTHORIZED, User not found!"});
          }

          const passwordsMatch = User.passwordMatches(req.body.password, user.password);
          if(!passwordsMatch){
            return res.status(401).json({message:"Invalid Password!"});
          }
          console.log('USER INFO', user);
          // get the generated token and send it as a response
          const token = generateJWT(user);
          return res.status(200).json({token: token});

      });

} );


function validate(body){
  let errors = '';
  if(StringUtil.isEmpty(body.username)){
    errors += 'Username is required.';
  }
  if(StringUtil.isEmpty(body.password)){
    errors += 'Password is required.'
  }

  return {
    isValid: StringUtil.isEmpty(errors),
    message: errors
  }
}
//module.exports= router;
export default router;