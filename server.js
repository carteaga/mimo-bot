const sulla = require("@open-wa/wa-automate");
const CommandParser = require("./src/CommandParser");
const commandOrquester = require("./src/InitCommand");
const express = require("express");
const { config, configBot } = require("./src/config/index");
const debug = require("debug")("app:server");
const LuisParser = require("./src/LuisParsers");

const moment = require("moment");
moment.locale("es");
const commandParser = new CommandParser();
const luisParser = new LuisParser();
const app = express();
app.use(express.json());

let clientGlobal;

async function processMessage(message) {
  const { body, from, type, caption, chatId } = message;
  const regex = /(^!.*)|(mbot|bot|mimo-bot|mimo\s+bot)/i;
  const commandRegex = /^!.*/;
  const rawMessage = type != "chat" ? caption : body;

  if (regex.test(rawMessage)) {
    let messageProcessed = rawMessage;

    if (!commandRegex.test(rawMessage)) {
      messageProcessed = await luisParser.parser(rawMessage);
    }

    const { command, params } = commandParser.parser(messageProcessed);
    debug(
      `- ${from} envia: ${rawMessage} (${type}) = commando "${command}", parametros [${params}]`
    );

    await commandOrquester.execute({
      command,
      params,
      type,
      context: message,
      client: clientGlobal,
    });
  }

  await clientGlobal.sendSeen(chatId);
}

async function start(client) {
  clientGlobal = client;

  client.onStateChanged((state) => {
    console.log("statechanged", state);
    if (state === "CONFLICT") client.forceRefocus();
  });

  try {
    await client.onMessage(processMessage);
  } catch (err) {
    console.log(err);
  }
}

sulla
  .create("session", {
    ...configBot,
    restartOnCrash: start,
  })
  .then(async (client) => await start(client))
  .catch((e) => {
    console.log("error", e);
  });

app.get("/", async (req, res) => {
  return res.sendFile("./index.html", { root: __dirname });
});

app.listen(config.port, function () {
  debug(`Example app listening on port ${config.port}!`);
});

/* ping message */
setInterval(async () => {
  if (clientGlobal) {
    debug(`enviado ping a ${config.phonePing}`);
    await clientGlobal.sendText(
      config.phonePing,
      `ping ${moment().format("LLLL")}`
    );
  }
}, config.timePing);
