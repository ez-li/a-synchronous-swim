
const keypressHandler = require('./js/keypressHandler');
const httpHandler = require('./js/httpHandler');
const messages = require('./js/messageQueue');

// httpHandler.router

keypressHandler.initialize(message => {
  console.log(`Message received: ${message}`);
  messages.enqueue(message);
});

httpHandler.initialize(messages.messages);

const http = require('http');
const server = http.createServer(httpHandler.router);

const port = 3000;
const ip = '127.0.0.1';
server.listen(port, ip);

console.log('Server is running in the terminal!');
console.log(`Listening on http://${ip}:${port}`);
// console.log(`${httpHandler.backgroundImageFile}`)

