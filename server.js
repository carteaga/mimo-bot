const sulla = require("sulla-hotfix");
const CommandParser = require("./utils/CommandParser");
const commandOrquester = require("./utils/InitCommand");
const commandParser = new CommandParser();

sulla.create().then(async client => await start(client));

async function start(client) {
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
