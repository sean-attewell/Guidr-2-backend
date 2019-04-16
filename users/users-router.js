const router = require('express').Router();

const Users = require('../helpers/users-model');
const Adventures = require('../helpers/adventures-model');
// const restricted = require('../auth/restricted-middleware.js');
// then has restricted as second param in function

router.get('/', async (req, res) => {
  try {
    const allUsers = await Users.findAll();
    res.status(200).json(allUsers);
  } catch(error) {
    res.status(500).json({ error: "There was an error getting users from the database" })
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const user = await Users.findById(id);
    if (user.length > 0) {
      res.status(200).json(user[0]);
    } else {
      res.status(404).json({ error: `User with id ${id} does not exist`})
    }
  } catch(error) {
    res.status(500).json({ error: "There was an error getting the adventure from the database" })
  }
});

router.get("/:id/adventures", async (req, res) => {
  const id = req.params.id;
  try {
      const user = await Users.findById(id);
      const adventures = await Adventures.getAdventuresForUserWithId(id)

      if(user.length > 0) { 
      res.status(200).json({ ...user[0], adventures: adventures });
      } else {
        res.status(400).json({ message: `User with id ${id} not found.` });
      }
  } catch (error) {
      res.status(400).json({ message: `Database error.` });
  }
});



module.exports = router;