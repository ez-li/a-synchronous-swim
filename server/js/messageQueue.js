const messages = []; // the storage unit for messages

module.exports.enqueue = (message) => {
  // console.log(`Enqueing message: ${message}`);
  // console.log('')
  messages.push(message);

};

module.exports.dequeue = () => {
  // returns undefined if messages array is empty
  return messages.shift();
};

module.exports.messages = messages;