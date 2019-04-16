const db = require('../data/dbConfig.js');

module.exports = {
  findAll,
  findById,
  add,
  remove,
  findBy
};

function findAll() {
  return db('users').select('id', 'username', 'password', 'role');
}

function findById(id) {
  return db('users')
    .where({ id })
}

async function add(user) {
  const [id] = await db('users').insert(user);

  return findById(id);
}

async function remove(id) {
  return db('users').where({ id }).delete();
}

function findBy(filter) {
  return db('users').where(filter);
}