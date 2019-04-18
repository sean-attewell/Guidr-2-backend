const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {
  makeTokenFromUser,
}

const mySecret = process.env.SECRET || 'Heroku secret'

function makeTokenFromUser(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role
  }
  const options = {
    expiresIn: '1h',
  }
  const token = jwt.sign(payload, mySecret, options);
  return token
}