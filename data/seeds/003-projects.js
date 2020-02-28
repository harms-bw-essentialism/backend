
exports.seed = function(knex) {
  return knex('projects').del()
    .then(function () {
      return knex('projects').insert([
        {
          projectName: 'Build Week PL',
          projectDescription: 'Guide a group of up and coming web developers in creating a group project.',
          userId: 1
        }
      ]);
    });
};
