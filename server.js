const sulla = require("sulla-hotfix");
const CommandParser = require("./src/CommandParser");
const commandOrquester = require("./src/InitCommand");
const commandParser = new CommandParser();

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
        console.log(
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
      client.kill();
    }
  });
}

sulla.create("session").then(async client => await start(client));
