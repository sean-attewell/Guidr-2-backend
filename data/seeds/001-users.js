
exports.seed = function (knex, Promise) {
  const hashPassword = require('../../helpers/hashPassword');

  const hashedPassword = hashPassword('123');

    // Deletes ALL existing entries
    return knex('users').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('users').insert([
          {
            username: 'Mr A',
            password: hashedPassword,            
            role: 'Explorer'
          },
          {
            username: 'Ms B',
            password: hashedPassword,
            role: 'Guide'       
          },
          {
            username: 'Sir C',
            password: hashedPassword,
            role: 'Guide'
          }
        ]);
      });
  };