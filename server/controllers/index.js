var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      let result = models.messages.get();
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404);
      }
    }, // a function which handles a get request for all messages
    post: async function (req, res) {
      console.log('controllers.post');
      let result = await models.messages.post(req.body);
      console.log('message result');
      if (result) {
        res.status(200).send('messages posted well');
      } else {
        res.status(404);
      }
    }, // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      let result = models.users.get();
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(404);
      }
    }, // a function which handles a get request for all users
    post: async function (req, res) {
      let result = await models.users.post(req.body);
      console.log('user post');
      if (result) {
        res.status(200).send('posted well');
      } else {
        res.status(404);
      }
    }, // a function which handles posting a user to the database
  },
};
