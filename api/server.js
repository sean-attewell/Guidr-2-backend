const express = require('express');

const configureMiddleware = require('./middleware.js');
const usersRouter = require('../users/users-router.js');
const authRouter = require('../auth/auth-router.js');
const adventuresRouter = require('../adventures/adventures-router.js');

const server = express();
configureMiddleware(server);

server.use('/api/users', usersRouter);
server.use('/api/auth', authRouter);
server.use('/api/adventures', adventuresRouter);

server.get('/', (req, res) => {
  res.send("Present.");
});

module.exports = server;
