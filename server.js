const sulla = require("@open-wa/wa-automate");
const { configBot } = require("./src/config/index");
const processMessage = require("./src/processMessage");
const moment = require("moment");
moment.locale("es");

async function start(client) {
  clientGlobal = client;

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
