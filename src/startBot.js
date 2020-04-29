const processMessage = require("./processMessage");
const commandOrchestrator = require("./InitCommand");
const CommandParser = require("./CommandParser");
const pingPhone = require("./PingPhone");
const { config } = require("./config/index");

async function start(client) {
  const commandParser = new CommandParser();

  client.onStateChanged((state) => {
    console.log("statechanged", state);
    if (state === "CONFLICT") client.forceRefocus();
  });

  pingPhone(client, config.phonePing, config.timePing);

  await client.onMessage(
    async (message) =>
      await processMessage({
        message,
        client,
        commandParser,
        commandOrchestrator,
      })
  );
}

module.exports = start;