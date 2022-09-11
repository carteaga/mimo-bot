const { happyThursday } = require('../config');
const scheduleSendGif = require('../utils/scheduleSendGif');
const { users, schedule, timezone, gif } = happyThursday;

const sayHappyThursday = ({ client }) => {
  scheduleSendGif({ users, schedule, timezone, gif, client });
};

module.exports = sayHappyThursday;
