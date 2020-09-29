const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
import {StringUtil} from '../string-util';


// Define user Schema
const UserSchema = new mongoose.Schema({
  firstname: String,
  lastname:String,
  username: String,
  password:String
});


//  use timestamps to know when user was created or updated
UserSchema.set('timestamps', true);


UserSchema.virtual('fullName').get(function() {
  const firstname =StringUtil.capitalize(this.firstname).toLowerCase();
  const lastname = StringUtil.capitalize(this.lastname).toLowerCase();
  return `${firstname} ${lastname}`;

});

//  Validate user password
UserSchema.statics.passwordMatches= function(password, hash){
  return bcrypt.compareSync(password, hash);
};

// this will run before saving the user to the database
UserSchema.pre('save', function(next){
 // this.fistname = this.fistname.toLowerCase();
// this.lastname = this.lastname.toLowerCase();
 // this.username = this.username.toLowerCase();
  const unsavedPassword = this.password;
  this.password= bcrypt.hashSync(unsavedPassword);
  next();
} );



// compile schema to model
//const User =  mongoose.model('User', UserSchema, 'users');
export default mongoose.model('user', UserSchema, 'users');