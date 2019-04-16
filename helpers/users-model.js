const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findById,
  add,
  remove
};

function findAll() {
  return db('users').select('id', 'username', 'password', 'role');
}

function findById(id) {
  return db('users')
    .where({ id })
    .first(); // this line not in c
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

async function remove(id) {
  return db('users').where({ id }).delete();
}

// function findBy(filter) {
//   return db('users').where(filter);
// }