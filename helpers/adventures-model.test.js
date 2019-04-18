const db = require('../data/dbConfig.js');
const Adventures = require('./adventures-model')

describe('adventures-model', () => {

  afterEach(async () => {
    await db('adventures').truncate();
  })

  describe('findAll', ()=> {
    it('returns list of all adventures in db', async () => {
      await Adventures.add({
        user_id: 3,
        title: 'Test adventure',
        adventure_type: 'Climbing',
        location: 'Yosemite National Park',
        duration: '6 hours',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        });

      await Adventures.add({
        user_id: 1,
        title: 'Test adventure 2',
        adventure_type: 'Hiking',
        location: 'The Park',
        duration: '3 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 4th 2019'
      })

      const allAdventures = await Adventures.findAll();
      expect(allAdventures).toHaveLength(2);
      })
    })

    describe('findById', ()=> {
      it('returns a specific adventure by ID', async () => {
        await Adventures.add({
          user_id: 3,
          title: 'El Capitan',
          adventure_type: 'Climbing',
          location: 'Yosemite National Park',
          duration: '6 hours',
          professional: true,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
          });
  
        const adventure2 = await Adventures.add({
          user_id: 1,
          title: 'My second adventure',
          adventure_type: 'Hiking',
          location: 'The Park',
          duration: '3 hours',
          professional: false,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 4th 2019'
        })
  
        const foundAdventure = await Adventures.findById(2);
        expect(foundAdventure[0]).toEqual({
          id: 2,
          user_id: 1,
          title: 'My second adventure',
          adventure_type: 'Hiking',
          location: 'The Park',
          duration: '3 hours',
          professional: 0,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 4th 2019'
        })

        })
      })


  describe('add', () => {
    it('adds adventures into db', async () => {
    const newAdventure = await Adventures.add({
      user_id: 3,
      title: 'El Capitan',
      adventure_type: 'Climbing',
      location: 'Yosemite National Park',
      duration: '6 hours',
      professional: true,
      description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
      date: 'June 3rd 2019'
      });
    expect(newAdventure[0]).toEqual({
      id: 1,
      user_id: 3,
      title: 'El Capitan',
      adventure_type: 'Climbing',
      location: 'Yosemite National Park',
      duration: '6 hours',
      professional: 1,
      description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
      date: 'June 3rd 2019'
      })
    const allAdventures = await Adventures.findAll();
    expect(allAdventures).toHaveLength(1)
    })
  })

  describe('update', () => {
    it('updates an adventure in the database', async () => {
      await Adventures.add({
        user_id: 3,
        title: 'El Capitan',
        adventure_type: 'Climbing',
        location: 'Yosemite National Park',
        duration: '6 hours',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
      });

      const updatedAdvanture = await Adventures.update(1, {
        title: 'El Capitan edited',
        adventure_type: 'Climbing edited',
        location: 'Yosemite National Park edited',
        duration: '6 hours edited',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. edited',
        date: 'June 3rd 2019 edited'
      })

      expect(updatedAdvanture[0]).toEqual({
        id: 1,
        user_id: 3,
        title: 'El Capitan edited',
        adventure_type: 'Climbing edited',
        location: 'Yosemite National Park edited',
        duration: '6 hours edited',
        professional: 0,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. edited',
        date: 'June 3rd 2019 edited'
      })
    })
  })

  describe('delete', () => {
    it('deletes adventures correctly', async () => {
      const newAdventure1 = await Adventures.add({
        user_id: 3,
        title: 'El Capitan',
        adventure_type: 'Climbing',
        location: 'Yosemite National Park',
        duration: '6 hours',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        });

        await Adventures.add({
          user_id: 1,
          title: 'My second adventure',
          adventure_type: 'Hiking',
          location: 'The Park',
          duration: '3 hours',
          professional: false,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 4th 2019'
        })

        const numberDeleted = await Adventures.remove(newAdventure1[0].id)
        expect(numberDeleted).toBe(1);
  
        const allAdventures = await Adventures.findAll();
        expect(allAdventures).toHaveLength(1)
  
    })
  })

})