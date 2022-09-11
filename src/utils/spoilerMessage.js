const spoilerMessages = (message) =>
  `${message} ${String.fromCharCode('0x200B').repeat(2575)}`;

module.exports = spoilerMessages;
