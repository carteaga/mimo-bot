const { config } = require('../config/');
const debug = require('debug')('app:server');

async function sendPingMessage(client, phone) {
  debug('enviando mensaje :)');
  try {
    await client.sendText(phone, 'Enviando señales de vida');
  } catch (err) {
    debug('hubo un error ', err);
  }
}

function pingPhone({ client }) {
  if (!config.phone && !config.seconds) {
    debug('no hay telefono configurado');
    return;
  }

  setInterval(async () => sendPingMessage(client, phone), seconds);
}

module.exports = pingPhone;
