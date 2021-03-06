/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql2');
const axios = require('axios');

const API_URL = 'http://127.0.0.1:3000/classes';

describe('Persistent Node Chat Server', () => {
  const dbConnection = mysql.createConnection({
    user: 'root',
    password: '',
    database: 'chat',
  });

  beforeAll((done) => {
    dbConnection.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log('Connected successfully');
      }
    });

    const tablename = 'messages'; // TODO: fill this out

    /* Empty the db table before all tests so that multiple tests
     * (or repeated runs of the tests)  will not fail when they should be passing
     * or vice versa */
    dbConnection.query(`truncate ${tablename}`, done);
  }, 6500);

  afterAll(() => {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercys name, three days is all I need.';
    const roomname = 'Hello';
    // Create a user on the chat server database.
    axios.post(`${API_URL}/users`, { username })
      .then(() => {
        // Post a message to the node chat server:
        console.log('post here');
        return axios.post(`${API_URL}/messages`, { username, message, roomname });
      })
      .then(() => {
        // Now if we look in the database, we should find the posted message there.
        console.log('promise resolved');
        /* TODO: You might have to change this test to get all the data from
         * your message table, since this is schema-dependent. */
        const queryString = 'SELECT * FROM messages';
        const queryArgs = []; // this is fed into query string's ? variable to specify the query selection

        dbConnection.query(queryString, queryArgs, (err, results) => {
          if (err) {
            // console.log('error here', err);
            throw err;
          }
          // Should have one result:
          // console.log('this is results', results);
          expect(results.length).toEqual(1);

          // TODO: If you don't have a column named text, change this test.
          console.log('non error side');
          expect(results[0].messages).toEqual(message);
          done();
        });
      })
      .catch((err) => {
        throw err;
      });
  });

  it('Should output all messages from the DB', (done) => {
    const username = 'Valjean';
    const message = 'In mercys name, three days is all I need.';
    const roomname = 'Hello';

    // Let's insert a message into the db
    const queryString = 'SELECT messages FROM messages';
    const queryArgs = []; // Not sure what this is or does

    /* TODO: The exact query string and query args to use here
     * depend on the schema you design, so I'll leave them up to you. */
    dbConnection.query(queryString, queryArgs, (err) => {
      if (err) {
        throw err;
      }

      // Now query the Node chat server and see if it returns the message we just inserted:
      axios.get(`${API_URL}/messages`)
        .then((response) => {
          const messageLog = response.data;
          console.log(messageLog);
          console.log('our message', messageLog[0].messages);
          console.log('our roomname', messageLog[0].roomname);
          expect(messageLog[0].messages).toEqual(message);
          expect(messageLog[0].roomname).toEqual(roomname);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
});
