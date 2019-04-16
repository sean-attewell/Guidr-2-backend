const router = require('express').Router();

const Users = require('../helpers/users-model');
const Adventures = require('../helpers/adventures-model');

// const restricted = require('../auth/restricted-middleware.js');
// then has restricted as second param in function


router.get('/', async (req, res) => {
  try {
    const allAdventures = await Adventures.findAll();
    res.status(200).json(allAdventures);
  } catch (error) {
    res.status(500).json({ error: "There was an error getting adventures from the database" })
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const adventure = await Adventures.findById(id);
    if (adventure.length > 0) {
      res.status(200).json(adventure[0]);
    } else {
      res.status(404).json({ error: `Adventure with id ${id} does not exist` })
    }
  } catch (error) {
    res.status(500).json({ error: "There was an error getting the adventure from the database" })
  }
});

router.post('/', async (req, res) => {
  if (!req.body.user_id ||
    !req.body.title ||
    !req.body.adventure_type ||
    !req.body.location
  ) {
    res.status(422).json({ error: "Please provide user_id, title, adventure_type & location." });
  } else {
    try {
      const adventure = await Adventures.add(req.body);
      res.status(201).json(adventure[0]);
    } catch (error) {
      // console.log(error);
      res.status(500).json({ error: "There was an error while saving the adventure to the database" });
    }
  }
});

router.delete('/:id', async (req, res) => {
  id = req.params.id;
  try {
    const numberDeleted = await Adventures.remove(id);
    if (numberDeleted > 0) {
      res.status(200).json(numberDeleted);
    } else {
      res.status(404).json({ error: `Adventure id ${id} does not exist` });
    }
  } catch (err) {
    res.status(500).json({ error: "There was an error removing the adventure from the database" });
  }
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  if (!req.body.title ||
      !req.body.adventure_type ||
      !req.body.location
  ) {
    res.status(400).json({ errorMessage: "Please provide title, adventure_type & location." });
  } else {
    try {
      const updatedAdventure = await Adventures.update(id, req.body);
      if (updatedAdventure) {
        res.status(200).json(updatedAdventure[0]);
      } else {
        res.status(404).json({ message: `The adventure with id ${id} does not exist.` });
      }
    } catch (error) {
      res.status(500).json({ error: "There was an error updating the project on the database." });
    }
  }
});


module.exports = router;
