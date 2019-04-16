const router = require('express').Router();
const bcrypt = require('bcryptjs');

const Users = require('../helpers/users-model');
const hashPassword = require('../helpers/hashPassword');
const tokenService = require('./token-service.js')
require('dotenv').config();

router.post('/register', (req, res) => {
  let user = req.body;
  const hash = hashPassword(user.password);
  user.password = hash;

  Users.add(user)
    .then(saved => {
      const token = tokenService.makeTokenFromUser(saved);
      res.status(201).json({
        saved,
        token
      });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.makeTokenFromUser(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});


module.exports = router;