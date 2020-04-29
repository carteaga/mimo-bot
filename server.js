const sulla = require("@open-wa/wa-automate");
const { configBot, config } = require("./src/config/index");
const debug = require("debug")("app:server");
const express = require("express");
const app = express();
const startBot = require("./src/startBot");

sulla
  .create("session", {
    ...configBot,
    restartOnCrash: startBot,
  })
  .then(async (client) => {
    await startBot(client);
  })
  .catch((e) => {
    console.log("error", e);
  });

app.get("/", async (req, res) => {
  return res.sendFile("./index.html", { root: __dirname });
});

app.listen(config.port, function () {
  debug(`Example app listening on port ${config.port}!`);
});