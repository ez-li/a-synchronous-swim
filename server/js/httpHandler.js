const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const keypressHandler = require('./keypressHandler');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  console.log('initialize is working!')
  messageQueue = queue;
};

module.exports.router = (req, res, next = messages.dequeue) => {
  // req.url = 'http://http://127.0.0.1:8080/';
  // console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);
  res.end(messageQueue[0]);

  next(); // invoke next() at the end of a request to help with testing!
};
