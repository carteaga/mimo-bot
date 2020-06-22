const { default: PQueue } = require('p-queue');
const commandOrchestrator = require('./InitCommand');
const CommandParser = require('./CommandParser');
const pingPhone = require('./PingPhone');
const { config } = require('./config/index');
const processMessage = require('./processMessage');

async function start(client) {
  const commandParser = new CommandParser();
  const queue = new PQueue({
    concurrency: 4,
    autoStart: false,
  });

  client.onStateChanged((state) => {
    // eslint-disable-next-line no-console
    console.log('statechanged', state);
    if (state === 'CONFLICT') client.forceRefocus();
  });

  pingPhone(client, config.phonePing, config.timePing);

  await client.onMessage(async (message) =>
    queue.add(
      processMessage({
        message,
        client,
        commandParser,
        commandOrchestrator,
      })
    )
  );
}

module.exports = start;
