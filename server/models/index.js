// var db = require('../db');
// const { Users, Messages } = require('../db/index');
const Sequelize = require('sequelize');
const { db } = require('../db/index');

const Users = db.define('users', {
  username: Sequelize.STRING,
});

var Messages = db.define('messages', {
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
});

module.exports = {
  messages: {
    get: function () {
      return Messages.sync().then(function () {
        return Messages.findAll();
      });
    }, // a function which produces all the messages
    post: async function (body) {
      let username = body.username;
      let text = body.text;
      let roomname = body.roomname;
      return Messages.sync().then(function () {
        return Messages.create({
          username: username,
          text: text,
          roomname: roomname,
        });
      });
    }, // a function which can be used to insert a message into the database
  },

  users: {
    get: function () {
      return Users.sync().then(function () {
        return Users.findAll();
      });
    },
    post: function (body) {
      let username = body.username;
      return Users.sync().then(function () {
        return Users.create({ username: username });
      });
    },
  },
};
