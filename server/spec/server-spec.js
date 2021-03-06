/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

const mysql = require('mysql');
const request = require('request'); // You might need to npm install the request module!
const expect = require('chai').expect;

describe('Sprint-database', () => {
  describe('Persistent Node Chat Server', function () {
    var dbConnection;

    beforeEach(function (done) {
      dbConnection = mysql.createConnection({
        user: 'root',
        password: process.env.DATABASE_SPRINT_PASSWORD,
        database: 'chat',
      });
      dbConnection.connect();

      var tablename = 'messages';

      /* Empty the db table before each test so that multiple tests
       * (or repeated runs of the tests) won't screw each other up: */
      dbConnection.query('truncate ' + tablename, done);
    });

    afterEach(function () {
      dbConnection.end();
    });

    it('Should insert posted messages to the DB', function (done) {
      // Post the user to the chat server.
      request(
        {
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/users',
          json: { username: 'Valjean' },
        },
        function () {
          // Post a message to the node chat server:
          request(
            {
              method: 'POST',
              uri: 'http://127.0.0.1:3000/classes/messages',
              json: {
                username: 'Valjean',
                text: "In mercy's name, three days is all I need.",
                roomname: 'Hello',
              },
            },
            function () {
              // Now if we look in the database, we should find the
              // posted message there.

              // TODO: You might have to change this test to get all the data from
              // your message table, since this is schema-dependent.
              var queryString = 'SELECT * FROM messages';
              var queryArgs = [];

              dbConnection.query(queryString, queryArgs, function (
                err,
                results
              ) {
                // Should have one result:
                expect(results.length).to.equal(1);

                expect(results[0].text).to.equal(
                  "In mercy's name, three days is all I need."
                );

                done();
              });
            }
          );
        }
      );
    });

    it('Should output all messages from the DB', function (done) {
      // Let's insert a message into the db
      var queryString =
        'INSERT INTO messages (username , text, roomname,createdAt,updatedAt) VALUES (?, ?, ?,?,?)';
      var queryArgs = [
        'codestates',
        'Men like you can never change!',
        'main',
        new Date(),
        new Date(),
      ];
      // TODO - The exact query string and query args to use
      // here depend on the schema you design, so I'll leave
      // them up to you. */

      dbConnection.query(queryString, queryArgs, function (err) {
        if (err) {
          throw err;
        }

        // Now query the Node chat server and see if it returns
        // the message we just inserted:
        request('http://127.0.0.1:3000/classes/messages', function (
          error,
          response,
          body
        ) {
          var messageLog = JSON.parse(body);
          expect(messageLog[0].text).to.equal('Men like you can never change!');
          expect(messageLog[0].roomname).to.equal('main');
          done();
        });
      });
    });

    it("should get messages from a user through user's id", function (done) {
      request(
        {
          method: 'POST',
          uri: 'http://127.0.0.1:3000/classes/users',
          json: { username: 'Kim' },
        },
        function () {
          // Post a message to the node chat server:
          request(
            {
              method: 'POST',
              uri: 'http://127.0.0.1:3000/classes/messages',
              json: {
                username: 'Kim',
                text: "AA",
                roomname: 'Hello',
              },
            },
            function () {
              request(
                {
                  method: 'POST',
                  uri: 'http://127.0.0.1:3000/classes/messages',
                  json: {
                    username: 'Kim',
                    text: "BB",
                    roomname: 'Hello',
                  },
                },
                function () {
                  request({
                    method: 'GET',
                    uri: 'http://127.0.0.1:3000/classes/users/Kim'
                  }, function() {
                    var queryString = 'SELECT * FROM messages WHERE username=?';
                    var queryArgs = ['Kim'];
  
                    dbConnection.query(queryString, queryArgs, function (
                      err,
                      results
                    ) {
                      // Should have one result:
                      expect(results.length).to.equal(2);
  
                      expect(results[1].text).to.equal(
                        "BB"
                      );
  
                      done();
                    });
                  })
                }
              )
            }
          );
        }
      );
    });
  });
});
