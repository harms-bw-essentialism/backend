
exports.seed = function(knex) {
  return knex('values').del()
    .then(function () {
      return knex('values').insert([
        {  
          userId: 1,
          valueName: 'Coffee',
          valueTopThree: true,
          valueComment: 'It gives me life!'
        },
        {
          userId: 1,
          valueName: 'Saying Cheers',
          valueTopThree: true,
          valueComment: 'Gets me started on the right foot.',
        },
        {
          userId: 1,
          valueName: 'Ice Breakers',
          valueTopThree: true,
          valueComment: 'What better way to break the ice?'
        },
        {
          userId: 1,
          valueName: 'Making Money',
          valueTopThree: false
        }
      ]);
    });
};
