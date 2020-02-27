
exports.seed = function(knex) {
  return knex('values').del()
    .then(function () {
      return knex('values').insert([
        {
          name: 'Coffee',
          topThree: true,
          comment: 'It gives me life!',
          user_id: 1
        },
        {
          name: 'Saying Cheers',
          topThree: true,
          comment: 'Gets me started on the right foot.',
          user_id: 1
        },
        {
          name: 'Ice Breakers',
          topThree: true,
          comment: 'What better way to break the ice?',
          user_id: 1
        },
        {
          name: 'Making Money',
          topThree: false,
          user_id: 1
        }
      ]);
    });
};
