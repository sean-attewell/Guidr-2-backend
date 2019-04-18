const jwt = require('jsonwebtoken')

require('dotenv').config();

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  const mySecret = process.env.SECRET || 'Heroku secret'

  if (token) {
    jwt.verify(token, mySecret, (error, decodedToken) => { // callback lets us do stuff when verified
      if (error) {
        res.status(401).json({ message: 'Not authorized! (invalid token)' });
      } else {
        // put the decoded token so it's available to the endpoint on the req object
        req.decodedToken = decodedToken;
        //move the request along!
        next();
      }
    }) // 
  } else {
    res.status(400).json({ message: 'No credentials provided! (no token)' });
  }
};
