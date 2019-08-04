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
  if (req.method === 'GET' && req.url.includes('jpg')) {
    fs.readFile(module.exports.backgroundImageFile, function (err, content) {
      if (err || content === undefined) {
        res.writeHead(404, headers);
        res.end();
      } else {
        res.writeHead(200, headers);
        res.end(content);
      }
    });
  } else if (req.method === 'GET') {
    res.writeHead(200, headers);
    res.end(messageQueue[0]);
  } else if (req.method === 'POST' && req.url.includes('jpg')) {
    res.writeHead(201, headers);
    var fileData = new Buffer('');
    req.on('data',(chunk) => {
      fileData = Buffer.concat([fileData, chunk]);
    });
    req.on('end', () => {
      var file = multipart.getFile(fileData);
      fs.writeFile(module.exports.backgroundImageFile, file.data, (err) => {
        if (err) throw err;
      })
      res.end();
    })
  } else {
    res.writeHead(200, headers);
    res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!
};
