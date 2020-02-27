
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.string('username', 64)
                .unique()
                .notNullable();
            table.string('password', 64)
                .notNullable();
        })
        .createTable('values', table => {
            table.increments();
            table.string('name')
                .notNullable();
            table.boolean('agree')
                .notNullable();
            table.boolean('topThree');
            table.string('comment');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('projects', table => {
            table.increments();
            table.string('name', 64)
                .notNullable();
            table.string('description');
            table.integer('user_id')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('projects')
    .dropTableIfExists('values')
    .dropTableIfExists('users')
};
