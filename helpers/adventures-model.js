const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findById,
  add,
  remove,
  getAdventuresForUserWithId
};


function findAll() {
  return db('adventures');
}

function findById(id) {
  return db('adventures')
    .where({ id })
    .first(); 
}

async function add(adventure) {
  const [id] = await db('adventures').insert(adventure);

  return findById(id);
}

async function remove(id) {
  return db('adventures').where({ id }).delete();
}

function getAdventuresForUserWithId(id) {
  return db.select(
    "adventures.id",
    "adventures.title",
    "adventures.adventure_type",
    "adventures.location",
    "adventures.duration",
    "adventures.professional",
    "adventures.description",
    "adventures.date"
    )
    .from("users")
    .innerJoin("adventures", "users.id", "=", "adventures.user_id")
    .where("users.id", "=", id);
}