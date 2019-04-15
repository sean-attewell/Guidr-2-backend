
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('adventures').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('adventures').insert([
        {
          user_id: 1,
          title: 'My first adventure',
          adventure_type: 'Hiking',
          location: 'Garden',
          duration: '2 hours',
          professional: false,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
        },
        {
          user_id: 1,
          title: 'My second adventure',
          adventure_type: 'Hiking',
          location: 'The Park',
          duration: '3 hours',
          professional: false,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 4th 2019'
        },
        {
          user_id: 2,
          title: 'A serious trip',
          adventure_type: 'Rambling',
          location: 'Great Mountains',
          duration: '5 days',
          professional: true,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'July 20th 2019'
        },
        {
          user_id: 3,
          title: 'El Capitan',
          adventure_type: 'Climbing',
          location: 'Yosemite National Park',
          duration: '6 hours',
          professional: true,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
        },
      ]);
    });
};