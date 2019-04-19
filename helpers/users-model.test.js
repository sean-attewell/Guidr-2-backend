const db = require('../data/dbConfig.js');
const Users = require('./users-model')
const hashPassword = require('./hashPassword');

const hashedPassword = hashPassword('123');

describe('users-model', () => {

  afterEach(async () => {
    await db('users').truncate();
  })

  describe('findAll', ()=> {
    it('returns list of all users in db', async () => {
      await Users.add({
        username: 'Mr test1',
        password: hashedPassword,            
        role: 'Explorer'
        });

      await Users.add({
        username: 'Ms test2',
        password: hashedPassword,
        role: 'Guide'   
      })

      const allUsers = await Users.findAll();
      expect(allUsers).toHaveLength(2);
      })
    })

    describe('findBy', ()=> {
      it('returns users matching filter', async () => {


        await Users.add({
          username: 'Mr A',
          password: hashedPassword,            
          role: 'Explorer'
          });
  
        const user2 = await Users.add({
          username: 'Ms B',
          password: hashedPassword,
          role: 'Guide'   
        })
  
        const filteredUser = await Users.findBy({username: 'Ms B'}).first()
        expect(filteredUser).toEqual({
          id: 2,
          username: 'Ms B',
          password: hashedPassword,
          role: 'Guide'   
        });
        })
      })

  describe('add', ()=> {
    it('adds user to db', async () => {
      const newUser = await Users.add({
        username: 'Mr A',
        password: hashedPassword,            
        role: 'Explorer'
        });
      expect(newUser[0]).toEqual({
        id: 1,
        username: 'Mr A',
        password: hashedPassword,            
        role: 'Explorer'
        })
      const allUsers = await Users.findAll();
      expect(allUsers).toHaveLength(1)
    })
  })
})