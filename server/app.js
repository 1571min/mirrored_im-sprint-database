var express = require('express');
var db = require('./db');
var cors = require('cors');

// Middleware
var morgan = require('morgan');
var parser = require('body-parser');

// Router
var router = require('./routes.js');

var app = express();
module.exports.app = app;

// Set what we are listening on.
app.set('port', 3000);
app.use(cors());
// Logging and parsing
app.use(morgan('dev'));
app.use(parser.json());
app.use((req,res,next) => {
  console.log("Serving request type " + req.method + " for url " + req.url)
  next();
})
app.use((req,res,next) => {
  if(req.method === 'OPTIONS') {
    res.status(200).send('good')
  }
  next();
})
// Set up our routes
app.use('/classes', router);

// Serve the client files
app.use(express.static(__dirname + '/../client'));

// If we are being run directly, run the server.
if (!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}

