
exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', function (tbl) {
    tbl
      .increments();

    tbl
      .string('username', 255)
      .notNullable()
      .unique();

    tbl
      .string('password', 255)
      .notNullable();

    tbl
      .string('role', 255);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};