const request = require('supertest');
const server = require('../api/server');
const db = require('../data/dbConfig.js');

// const hashPassword = require('../helpers/hashPassword');
// const tokenService = require('./token-service.js')
// const hashedPassword = hashPassword('123');


describe('auth-router', () => {



  describe('POST /api/auth/register', () => {

    afterEach(async () => {
      await db('users').truncate();
    });

    it("returns correct status code on success", () => {
      const newUser = {
        username: 'Mr B',
        password: '123',
        role: 'Guide'
      }
      return request(server)
        .post(`/api/auth/register`)
        .send(newUser)
        .expect(201)
    })

    it("returns the right response body", async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      const registerRes = await request(server).post('/api/auth/register').send(testUser);

      const token = JSON.parse(registerRes.text).token;
      // const token = registerRes.body.token;
      const pass = JSON.parse(registerRes.text).saved[0].password;
      // const pass = registerRes.body.saved[0].password;

      expect(registerRes.body).toEqual({
        "saved": [
          {
            "id": 1,
            "username": "Mr A",
            "password": pass,
            "role": "Explorer"
          }
      ],
      "id": 1,
      "token": token
    })

  })

  describe('POST /api/auth/login', () => {

    afterEach(async () => {
      await db('users').truncate();
    });

    it('returns correct status code on success', async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      await request(server).post('/api/auth/register').send(testUser);
      
      const loginDetails = {username: 'Mr A', password: '123'}

      return request(server)
      .post(`/api/auth/login`)
      .send(loginDetails)
      .expect(200)
      
      
    })

    it('returns correct status code on failure', async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      await request(server).post('/api/auth/register').send(testUser);
      
      const IncorrectloginDetails = {username: 'Mr Z', password: '123'}

      return request(server)
      .post(`/api/auth/login`)
      .send(IncorrectloginDetails)
      .expect(401)
    })

    it('returns the right response body', async () => {
      const testUser = { username: 'Mr A', password: '123', role: 'Explorer' };
      await request(server).post('/api/auth/register').send(testUser);

      const loginRes = await request(server).post('/api/auth/login').send({ username: 'Mr A', password: '123' });
      const token = JSON.parse(loginRes.text).token;

      expect(loginRes.body).toEqual({
        message: "Welcome Mr A!",
        id: 1,
        token: token
      })
    })
  })
})
})