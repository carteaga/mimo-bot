const processMessage = require("./processMessage");
const commandOrchestrator = require("./InitCommand");
const CommandParser = require("./CommandParser");
const pingPhone = require("./PingPhone");
const { config } = require("./config/index");
const { default: PQueue } = require("p-queue");

async function start(client) {
  const commandParser = new CommandParser();
  const queue = new PQueue({
    concurrency: 4,
    autoStart: false,
  });

  client.onStateChanged((state) => {
    console.log("statechanged", state);
    if (state === "CONFLICT") client.forceRefocus();
  });

  client.onAnyMessage((message) => {
    
  });

  pingPhone(client, config.phonePing, config.timePing);

  await client.onMessage(
    async (message) =>
      await queue.add(
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
