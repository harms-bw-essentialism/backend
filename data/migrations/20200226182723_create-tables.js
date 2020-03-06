
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments();
            table.string('username', 64)
                .unique()
                .notNullable();
            table.string('password')
                .notNullable();
        })
        .createTable('values', table => {
            table.increments();
            table.string('valueName')
                .notNullable();
            table.boolean('valueTopThree');
            table.string('valueComment');
            table.integer('userId')
                .unsigned()
                .notNullable()
                .references('id')
                .inTable('users')
                .onUpdate('CASCADE')
                .onDelete('CASCADE')
        })
        .createTable('projects', table => {
            table.increments();
            table.string('projectName', 64)
                .notNullable();
            table.string('projectDescription');
            table.string('value');
            table.integer('userId')
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
