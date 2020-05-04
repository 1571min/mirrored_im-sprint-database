var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.connection.connect();
      db.connection.query('SELECT * from messages', function (err, rows) {
        if (!err) {
          return rows;
        }
        console.log('Error while performing Query.', err);
        return null;
      });
      db.connection.end();
    }, // a function which produces all the messages
    post: async function (body) {
      let username = body.username;
      let text = body.text;
      let roomname = body.roomname;

      let result = await db.connection.query(
        `INSERT INTO messages (name , message, roomname) VALUES ('testName', "testText", "testRoom")`,
        function (err, result) {
          if (!err) {
            console.log('query no error');
            return result;
          } else {
            console.error(err);
            console.log('message error');
            return null;
          }
        }
      );
      return result;
    }, // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (id) {
      db.connection.connect();
      db.connection.query('SELECT * from users', function (err, rows) {
        if (!err) {
          return rows;
        }
        console.log('Error while performing Query.', err);
        return null;
      });
      db.connection.end();
    },
    post: async function (body) {
      let username = body.username;
      let result = await db.connection.query(
        `INSERT INTO users (name) VALUES ('${username}')`,
        function (err, result) {
          if (!err) {
            return result;
          }
          console.log('users error');
          return null;
        }
      );

      return result;
    },
  },
};

// {
//   username: "Valjean",
//   text: "In mercy's name, three days is all I need.",
//   roomname: "Hello"
// }
