const commandOrchestrator = require('./InitCommand');
const CommandParser = require('./CommandParser');
const processMessage = require('./processMessage');
const errorHandler = require('./errorHandler');
const loadPlugins = require('./loadPlugins');

function start(client) {
  const commandParser = new CommandParser();
  client.onStateChanged((state) => {
    // eslint-disable-next-line no-console
    console.log('statechanged', state);
    if (state === 'CONFLICT') client.forceRefocus();
  });

  client.onMessage((message) =>
    processMessage({
      message,
      client,
      commandParser,
      commandOrchestrator,
      errorHandler,
    })
  );

  loadPlugins({ client });
}

module.exports = start;
