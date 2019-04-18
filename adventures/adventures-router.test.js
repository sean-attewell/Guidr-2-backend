const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig.js');

describe('adventures-router', () => {
  
  describe('GET api/adventures endpoint', () => {
    
    afterEach(async () => {
      await db('adventures').truncate();
      await db('users').truncate();
    });

    it('correct status code if no token', async () => {
      const res = await request(server).get('/api/adventures')
      expect(res.status).toBe(400)
    });

    it('correct status code if invalid token', async () => {
      const res = await request(server).get('/api/adventures').set('Authorization', 'myInvalidToken')
      expect(res.status).toBe(401)
    });

    it('correct status if valid token', async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      await request(server).post('/api/auth/register').send(testUser);
      const loginRes = await request(server).post('/api/auth/login').send({ username: 'Mr A', password: '123' });
      const token = JSON.parse(loginRes.text).token;
      // console.log(token)
      const res = await request(server).get('/api/adventures').set('Authorization', token)
      expect(res.status).toBe(200)
    });

    it('returns the right response body', async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      await request(server).post('/api/auth/register').send(testUser);
      const loginRes = await request(server).post('/api/auth/login').send({ username: 'Mr A', password: '123' });
      const token = JSON.parse(loginRes.text).token;

      const adventure1 = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
      };
      const adventure2 = {
        user_id: 1,
        title: 'My second adventure',
        adventure_type: 'Hiking',
        location: 'The Park',
        duration: '3 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 4th 2019'
      };
      await request(server).post('/api/adventures').send(adventure1)
      await request(server).post('/api/adventures').send(adventure2)

      const res = await request(server).get('/api/adventures').set('Authorization', token);
      expect(res.body).toHaveLength(2);

      expect(res.body).toEqual([
        {
          id: 1,
          user_id: 1,
          title: 'My first adventure',
          adventure_type: 'Hiking',
          location: 'Garden',
          duration: '2 hours',
          professional: 0,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
        },
        {
          id: 2,
          user_id: 1,
          title: 'My second adventure',
          adventure_type: 'Hiking',
          location: 'The Park',
          duration: '3 hours',
          professional: 0,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 4th 2019'
        }
      ])
    })

  })

  describe('POST /api/adventures endpoint', () => {

    afterEach(async () => {
      await db('adventures').truncate();
    });

    it("returns correct status code on success", () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      return request(server)
        .post(`/api/adventures`)
        .send(adventure)
        .expect(201)
    });

    it("returns correct status code on failure", () => {
      const adventure = { 
          title: 'My first adventure',
          adventure_type: 'Hiking',
          location: 'Garden',
          duration: '2 hours',
          professional: false,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
        };
      return request(server)
        .post(`/api/adventures`)
        .send(adventure)
        .expect(422);
    });

    it("returns the right response body", () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const expectedResponseBody = { 
        id: 1,
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: 0,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      return request(server)
        .post(`/api/adventures`)
        .send(adventure)
        .expect(expectedResponseBody)
        .expect('Content-Type', /json/)
    });

  })

  describe('PUT /api/adventures endpoint', () => {
    afterEach(async () => {
      await db('adventures').truncate();
    })

    it("returns correct status code on success", async () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const adventureEdit = {
        title: 'My first adventure Edited',
        adventure_type: 'Hiking Edited',
        location: 'Garden Edited',
        duration: '2 hours Edited',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. Edited',
        date: 'June 3rd 2019 Edited'
      }  
      await request(server).post(`/api/adventures`).send(adventure)
      return request(server)
        .put('/api/adventures/1')
        .send(adventureEdit)
        .expect(200)
    })

    it("returns correct status code on field missing failure", async () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const adventureEdit = {
        adventure_type: 'Hiking Edited',
        location: 'Garden Edited',
        duration: '2 hours Edited',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. Edited',
        date: 'June 3rd 2019 Edited'
      }  
      await request(server).post(`/api/adventures`).send(adventure)
      return request(server)
        .put('/api/adventures/1')
        .send(adventureEdit)
        .expect(400)
    })

    it("returns correct status code on id failure", async () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const adventureEdit = {
        title: 'My first adventure',
        adventure_type: 'Hiking Edited',
        location: 'Garden Edited',
        duration: '2 hours Edited',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. Edited',
        date: 'June 3rd 2019 Edited'
      }  
      await request(server).post(`/api/adventures`).send(adventure)
      return request(server)
        .put('/api/adventures/32')
        .send(adventureEdit)
        .expect(404)
    })

    it("returns the right response body", async () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const adventureEdit = {
        title: 'My first adventure',
        adventure_type: 'Hiking Edited',
        location: 'Garden Edited',
        duration: '2 hours Edited',
        professional: true,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. Edited',
        date: 'June 3rd 2019 Edited'
        }  
      const expectedResponseBody = {
        id:1,
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking Edited',
        location: 'Garden Edited',
        duration: '2 hours Edited',
        professional: 1,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim. Edited',
        date: 'June 3rd 2019 Edited'
      }
      await request(server).post(`/api/adventures`).send(adventure)

      return request(server)
        .put(`/api/adventures/1`)
        .send(adventureEdit)
        .expect(expectedResponseBody)
        .expect('Content-Type', /json/)
    });

  })

  describe('DELETE /api/adventures/:id endpoint', () => {
    afterEach(async () => {
      await db('adventures').truncate();
    })

    it("returns correct status code on success", async () => {
      const adventure = {
        user_id: 1,
        title: 'My first adventure',
        adventure_type: 'Hiking',
        location: 'Garden',
        duration: '2 hours',
        professional: false,
        description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
        date: 'June 3rd 2019'
        };
      const res = await request(server).post(`/api/adventures`).send(adventure);
      const newAdventure = res.body;
      expect(newAdventure).toEqual(
        { id: 1,
          user_id: 1,
          title: 'My first adventure',
          adventure_type: 'Hiking',
          location: 'Garden',
          duration: '2 hours',
          professional: 0,
          description: 'Bacon ipsum dolor amet bacon alcatra swine, jerky andouille drumstick kielbasa prosciutto. Swine kevin corned beef capicola rump. Kielbasa short ribs ham hock ball tip meatball prosciutto cow shankle picanha alcatra turducken chuck kevin. Ribeye fatback turkey cupim.',
          date: 'June 3rd 2019'
          }); 
      
      return request(server)
      .delete(`/api/adventures/1`)
      .expect(200);
      });


    it("returns correct status code on failure", () => {
      return request(server)
        .delete(`/api/adventures/32`)
        .expect(404);
    });
  })

})