
exports.up = function(knex) {
    return knex.schema
      .table('users', users => {
          users.renameColumn('phone_number','phoneNumber')
      })
  };
  
  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('users')
      .dropTableIfExists('plants')
  };
  