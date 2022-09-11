const { callDotas: callDotasConfig } = require('../config');
const scheduleSendGif = require('../utils/scheduleSendGif');
const { users, schedule, timezone, gif } = callDotasConfig;

const callDotas = ({ client }) => {
  scheduleSendGif({ users, schedule, timezone, gif, client });
};

module.exports = callDotas;
