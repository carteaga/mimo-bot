const sulla = require("sulla-hotfix");
const CommandParser = require("./src/CommandParser");
const commandOrquester = require("./src/InitCommand");
const express = require("express");
const { config } = require("./src/config/index");
const debug = require("debug")("app:server");

const commandParser = new CommandParser();

const app = express();
app.use(express.json());

async function start(client) {
  client.onStateChanged(state => {
    console.log("statechanged", state);
    if (state === "CONFLICT") client.forceRefocus();
  });

  client.onMessage(async message => {
    try {
      const { body, from, type } = message;
      if (type == "chat") {
        const { command, params } = commandParser.parser(body);
        debug(
          `- ${from} envia: ${body} = commando "${command}", parametros [${params}]`
        );
        await commandOrquester.execute({
          command,
          params,
          context: message,
          client
        });
      }
    } catch (err) {
      console.log(err);
    }
  });
}

sulla
  .create("session", {
    throwErrorOnTosBlock: true,
    headless: !config.dev,
    autoRefresh: true,
    qrRefreshS: 15,
    killTimer: 40,
    cacheEnabled: false,
    devtools: config.dev,
    blockCrashLogs: true
  })
  .then(async client => await start(client))
  .catch(e => {
    console.log("error", e);
  });

app.get("/", async (req, res) => {
  return res.sendFile("./index.html", { root: __dirname });
});

app.listen(config.port, function() {
  debug(`Example app listening on port ${config.port}!`);
});
