
exports.up = function (knex, Promise) {
  return knex.schema.createTable('adventures', function (tbl) {
    tbl
      .increments();

    tbl
      .integer('user_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
      
    tbl
      .string('title', 255)
      .notNullable()
      .unique();

    tbl
      .string('adventure_type', 255)
      .notNullable();
    
    tbl
      .string('location', 255)
      .notNullable();
    
    tbl
      .string('duration', 255);

    tbl
      .boolean('professional')
      .defaultTo(false);
    
    tbl
      .text('description');
    
    tbl
      .string('date', 255);
  });
};

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('adventures');
};