import jwt from 'jsonwebtoken';

process.env.TOKEN_SECRET = 'my-development-secret';
export function generateJWT(user){
  const tokenData = {username: user.username, password: user.password, id: user._id};
  // every token you create is going to be signed with the TOKEN_SECRET, so you
  // need the secret in order to decrypt the token
  return jwt.sign({user: tokenData},process.env.TOKEN_SECRET );
}

// requireLogin function can be attached to any route that require
// user to be logged in to access it
export function requireLogin(req, res,  next){
  const token = decodeToken(req);
  if(!token){
    return res.status(401).json({message: 'You must be logged in!'});
  }
  next();
}


export function decodeToken(req) {
  const token = req.headers.authentication || req.headers['authorization'] ;
  // if there is no token attached to the header return null
  if(!token){
    return null;
  }
  // otherwise decrypt the token (the secret is needed to decrypt the token)
  try{
    return jwt.verify(token, process.env.TOKEN_SECRET);
  }catch(error){
    return null;
  }


}


export function getUsername(req){
  const token = decodeToken(req);
  if(!token){
    return null;
  }
  return token.user.username;
}

export function getUserId(req){
  const token = decodeToken(req);
  if(!token){
    return null;
  }
  return token.user.id;
}