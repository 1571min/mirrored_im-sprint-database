var models = require('../models');

module.exports = {
  messages: {
    get: async function (req, res) {
      try {
        let result = await models.messages.get();
        res.status(200).send(result);
      } catch(error) {
        res.status(404);
      }
    }, // a function which handles a get request for all messages
    post: async function (req, res) {
      try {
        await models.messages.post(req.body);
        res.status(200).send('messages posted well');
      } catch(error) {
        res.status(404);
      }
    }, // a function which handles posting a message to the database
  },

  users: {
    get: async function (req, res) {
      try {
        let result = await models.users.get();
        res.status(200).send(result);
      } catch(error) {
        res.status(404);
      }
    }, // a function which handles a get request for all users
    post: async function (req, res) {
      try {
        await models.users.post(req.body);
        res.status(200).send('users posted well');
      } catch(error) {
        res.status(404);
      }
    }, // a function which handles posting a user to the database
  },

  usersmessage: {
    get: async function (req, res) {
      try {
        let result = await models.users.get(req.params.username);
        res.status(200).send(result);
      } catch(error) {
        res.status(404);
      }
    }, // a function which handles a get request for all users
  },
};
