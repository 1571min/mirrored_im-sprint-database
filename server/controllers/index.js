var models = require('../models');

module.exports = {
  messages: {
    get:  function (req, res) {
      let result = models.messages.get(req,res);
    // console.log('get',result)
      if (result) {
        res.status(200).send(result);
      } else {
        res.status(401);
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      let result = models.messages.post(req.body);
      if (result) {
        console.log('post',result)
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
    post: function (req, res) {
      let result = models.users.post(req.body);
      if (result) {
        res.status(200).send('posted well');
      } else {
        res.status(404);
      }
    }, // a function which handles posting a user to the database
  },
};
