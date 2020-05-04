var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      let result = models.messages.get()
      if(result) {
        res.status(200).send(result);
      } else {
        res.status(404);
      }
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('controllers.post')
      let result = models.messages.post(req.body);
      if(result) {
        res.status(200).send(result);
      } else {
        res.status(404);
      }
    } // a function which handles posting a message to the database
  },

  users: {
    get: function (req, res) {
      
    }, // a function which handles a get request for all users
    post: function (req, res) {} // a function which handles posting a user to the database
  }
};


