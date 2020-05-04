var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.connection.connect();
      db.connection.query('SELECT * from chat', function(err, rows) {
        if (!err) {
          return rows
        } 
        console.log('Error while performing Query.', err);
        return null;
      });
      db.connection.end();
    }, // a function which produces all the messages
    post: function (body) {
      let username = body.username;
      let text = body.text;
      let roomname = body.roomname;
      db.connection.connect(function(err) {
        if(err) {
          throw err;
        } console.log("Connected!");
        let sql = `INSERT INTO chat (name, message, roomname) VALUES (${username}, ${text}, ${roomname})`;
        db.connection.query(sql, function(err) {
          if(!err) {
            return 'posted well'
          } console.log("error");
          return null;
        })
      })
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

// {
//   username: "Valjean",
//   text: "In mercy's name, three days is all I need.",
//   roomname: "Hello"
// }