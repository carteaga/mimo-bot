const sulla = require("@open-wa/wa-automate");
const { configBot, config } = require("./src/config/index");
const processMessage = require("./src/processMessage");
const debug = require("debug")("app:server");
const express = require("express");
const app = express();

app.get("/", async (req, res) => {
  return res.sendFile("./index.html", { root: __dirname });
});

app.listen(config.port, function () {
  debug(`Example app listening on port ${config.port}!`);
});

async function start(client) {
  client.onStateChanged((state) => {
    console.log("statechanged", state);
    if (state === "CONFLICT") client.forceRefocus();
  });

  try {
    await client.onMessage((message) => processMessage(message, client));
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
