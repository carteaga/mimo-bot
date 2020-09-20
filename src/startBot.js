const commandOrchestrator = require('./InitCommand');
const CommandParser = require('./CommandParser');
const pingPhone = require('./PingPhone');
const { config } = require('./config/index');
const processMessage = require('./processMessage');
const errorHandler = require('./errorHandler');

function start(client) {
  const commandParser = new CommandParser();
  client.onStateChanged((state) => {
    // eslint-disable-next-line no-console
    console.log('statechanged', state);
    if (state === 'CONFLICT') client.forceRefocus();
  });

  pingPhone(client, config.phonePing, config.timePing);

  client.onMessage((message) =>
    processMessage({
      message,
      client,
      commandParser,
      commandOrchestrator,
      errorHandler,
    })
  );
}

module.exports = start;
