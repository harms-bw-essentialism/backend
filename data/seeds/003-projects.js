
exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        {
          name: 'Build Week PL',
          description: 'Guide a group of up and coming web developers in creating a group project.',
          user_id: 1
        }
      ]);
    });
};
