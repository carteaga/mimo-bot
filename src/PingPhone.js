const debug = require('debug')('app:server');

function pingPhone(client, phone, seconds) {
  if (phone) {
    setInterval(async () => {
      debug('enviando mensaje :)');
      try {
        await client.sendText(phone, `Enviando señales de vida`);
      } catch (err) {
        debug('hubo un error loco ', err);
      }
    }, seconds);
  } else {
    debug('no hay telefono configurado');
  }
}

module.exports = pingPhone;
