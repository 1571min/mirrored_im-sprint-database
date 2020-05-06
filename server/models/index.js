var db = require('../db');

module.exports = {
  messages: {
    get: function (req,res) {
      return new Promise((resolve, reject) => {
        db.connection.query('SELECT * from messages', function (err, rows) {
          if (!err) {
            resolve(rows);
          } reject(err);
        })
      })
    }, // a function which produces all the messages
    post: async function (body) {
      return new Promise((resolve, reject) => {
        let username = body.username;
        let text = body.text;
        let roomname = body.roomname;
        let query = 'INSERT INTO messages (username , text, roomname) VALUES (?, ?, ?)'
        let params = [username, text, roomname]
        db.connection.query(
          query, params,
          function (err, result) {
            if (!err) {
              resolve(result)
            } reject(err)
          }
        );
      })
    }, // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      return new Promise((resolve, reject) => {
        db.connection.query('SELECT * from users', function (err, rows) {
          if (!err) {
            resolve(rows);
          } reject(err)
        });
      })
    },
    post: function (body) {
      return new Promise((resolve, reject) => {
        let username = body.username;
        db.connection.query(
          `INSERT INTO users (username) VALUES ('${username}')`,
          function (err, result) {
            if (!err) {
              resolve(result);
            } reject(err)
          }
        )
      })
    },
  }
};
