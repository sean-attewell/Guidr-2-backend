const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findById,
  add,
  remove,
  update,
  getAdventuresForUserWithId
};


function findAll() {
  return db('adventures');
}

function findById(id) {
  return db('adventures')
    .where({ id })
}

async function add(adventure) {
  const [id] = await db('adventures').insert(adventure);

  return findById(id);
}

async function remove(id) {
  return db('adventures').where({ id }).delete();
}

async function update(id, changes) {
  return db('adventures')
  .where('id', id)
  .update(changes)
  .then(count => (count > 0 ? findById(id) : null));
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