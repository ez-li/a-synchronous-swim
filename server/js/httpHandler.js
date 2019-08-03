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
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  // console.log(req);

  // if (req.method === 'GET') {
  //   res.writeHead(200, headers);
  //   res.end(messageQueue[0]);
  // }
  // if (req.method === 'POST') {
  //   res.writeHead(200, headers);
  //   console.log(res);
  //   // store the image
  //   res.end();
  // }
  contents = fs.readFileSync(module.exports.backgroundImageFile);
  res.end(contents);

  // fs.readFile(module.exports.backgroundImageFile, function (err, content) {
  //   // if (err) {
  //   //   res.writeHead(400, {'Content-type':'text/html'})
  //   //   console.log(err);
  //   //   res.end("No such image");
  //   // } else {
  //     //specify the content type in the response will be an image
  //   // res.header("Access-Control-Allow-Origin", "*");
  //   // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   //{'Content-type':'image/jpg'}
  //   res.writeHead(200, headers);
  //   console.log('fs.readFile', content);
  //   res.end(content);
  // // }
  // });

  //if type = post
  //if file not there then res.writeHead(404)
  //if file is there then


  next(); // invoke next() at the end of a request to help with testing!
};
