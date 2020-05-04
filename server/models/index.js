var db = require('../db');

module.exports = {
  messages: {
    get: function (req,res) {
       db.connection.query('SELECT * from messages', function (err, rows) {
        if (!err) {
          res.send(rows);
          return;
        } return null;
      }
      );
    }, // a function which produces all the messages
    post: function (body) {
      let username = body.username;
      let text = body.text;
      let roomname = body.roomname;
      let query = 'INSERT INTO messages (username , text, roomname) VALUES (?, ?, ?)'
      let params = [username, text, roomname]
      let result = db.connection.query(
        query, params,
        function (err, result) {
          if (!err) {
            return result;
          } return null;
        }
      );
      return result;
    }, // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      let result = db.connection.query('SELECT * from users', function (err, rows) {
        if (!err) {
          return rows;
        } return null;
      });
      return result;
    },
    post: function (body) {
      let username = body.username;
      let result = db.connection.query(
        `INSERT INTO users (username) VALUES ('${username}')`,
        function (err, result) {
          if (!err) {
            return result;
          } return null;
        }
      );
      return result;
    },
  },
};
