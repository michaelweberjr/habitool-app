const request = require('supertest');

const server = 'http://localhost:5000';
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 404 status', () => {
        return request(server).get('/').expect(404);
      });
    });
  });

  /////////////////////////////////////SIGNUP TEST/////////////////////////////////////
  xdescribe('/signup', () => {
    describe('GET', () => {
      it('responds with 200 status and html content back', () => {
        return request(server)
          .get('/signup')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    describe('POST', () => {
      const bodyExample = {
        name : 'eddie',
        email: 'eddie123@gmail.com',
        password: '123',
      };
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .post('/signup')
          .send(bodyExample)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
    describe('POST', () => {
      const bodyExample = {
        name : 'eddie',
        email: 'eddie123@gmail.com',
        password: '123',
      };
      it('responds with 500, internal server error if email is already used.', () => {
        return request(server)
          .post('/signup')
          .send(bodyExample)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500);
      });
    });
  });

  //////////////////////////////////////SIGNIN TEST//////////////////////////////////////////
  xdescribe('/login', () => {
    describe('GET', () => {
      it('responds with 200 status and html content back', () => {
        return request(server)
          .get('/login')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
    describe('POST', () => {
      it('responds with 500 status and application/json content type with wrong login credentials', () => {
        const bodyExample = {
          email: 'eddie123@gmail.com',
          password: '1234',
        };
        return request(server)
          .post('/login')
          .send(bodyExample)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(500)
      });

      it('responds with 200 status and application/json content type with right login credentials and SSID', () => {
        const bodyExample = {
          email: 'eddie123@gmail.com',
          password: '123',
        };
        return request(server)
          .post('/login')
          .send(bodyExample)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .expect('set-cookie', 'SSID=%242a%2405%24IvtLGJcklFuaB3jnYlj.GuoJxlJztQHym%2FpONHDv76C7WL4vo2N9m; Path=/');
      });
    });
  });

  describe('/habit', () => {
    const bodyExample = { email: 'eddie123@gmail.com', 
    habit: 'add habit test', 
    description: 'testing add habit', 
    total: '0', 
    startDate: "2023-05-31", 
    endDate: "2024-05-31", 
    cadence: '' }

    describe('wrongPath', () => {
      it('responds with 404 status and html content', () => {
        return request(server)
          .post('/habit')
          .send(bodyExample)
          .expect('Content-Type', /text\/html/)
          .expect(404);
      });
    });

    xdescribe('addHabit', () => {
      it('responds with 200 status and html content back', () => {
        return request(server)
          .post('/habit/addHabit')
          .send(bodyExample)
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
    
    xdescribe('removeHabit', () => {
      it('responds with 200 status and html content back', () => {
        return request(server)
          .post('/habit/removeHabit')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
    xdescribe('editHabit', () => {
      it('responds with 200 status and html content back', () => {
        return request(server)
          .post('/habit/editHabit')
          .expect('Content-Type', /json/)
          .expect(200);
      });
    });
  });
});
