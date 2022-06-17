// test/app.integration.spec.js
const request = require('supertest'),
  app = require('../app'),
  connection = require('../connection');

describe('Test routes', () => {
  // truncate bookmark table before each test
  const testBookmark = { url: 'https://nodejs.org/', title: 'Node.js' };
  beforeEach(() => {
    connection.query('TRUNCATE bookmark')
  });


  // ... tests ...
  it('GET / sends "Hello World" as json', (done) => {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { message: 'Hello World!'};
        expect(response.body).toEqual(expected);
        done();
      });
  });

  it('POST /bookmarks - error (fields missing) ', (done) => {
    request(app)
      .post('/bookmarks')
      .send({})
      .expect(422)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { error: 'required field(s) missing'};
        expect(response.body).toEqual(expected);
        done();
      })
  })

  it('POST /bookmarks - success ', (done) => {
    request(app)
      .post('/bookmarks')
      .send({ url: 'https://jestjs.io', title: 'Jest' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => {
        const expected = { id: expect.any(Number), url: 'https://jestjs.io', title: 'Jest' };
        expect(response.body).toEqual(expected);
        done();
      })
  })

  describe('GET /bookmarks/:id', () => {
    const testBookmark = { url: 'https://nodejs.org/', title: 'Node.js' };
    beforeEach((done) => {
      connection.query(
        'TRUNCATE bookmark', () => connection.query(
          'INSERT INTO bookmark SET ?', testBookmark, done
        )
      )
    });
  
    // Write your tests HERE!
    it('GET /bookmarks/:id not found', (done) => {
      request(app)
        .get('/2')
        .expect(404)
        .expect('Content-Type', /json/)
        .then(response => {
          const expected = { error: 'Bookmark not found' };
          expect(response.body).toEqual(expected);
          done();
        });
    });

    it('GET /bookmarks/:id found', (done) => {
      request(app)
        .get('/1')
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          const expected = { 
            bookmark: { 
              id: expect.any(Number), 
              url: 'https://nodejs.org/', 
              title: 'Node.js' 
            }
          };
          expect(response.body).toEqual(expected);
          done();
        });
    });
  });
});