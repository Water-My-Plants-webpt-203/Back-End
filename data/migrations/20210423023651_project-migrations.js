
exports.up = function(knex) {
  return knex.schema
    .createTable('users', users => {
        users.increments('user_id')
        users.string('username').notNullable().unique()
        users.string('password').notNullable()
        users.string('phone_number')
    })
    .createTable('plants', plants => {
        plants.increments('plant_id')
        plants.string('nickname')
        plants.string('species')
        plants.integer('h2oFrequency')
        plants.string('image')
        plants.integer('user_id').notNullable().references('user_id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')
    })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('plants')
};
