const sulla = require("sulla-hotfix");
const CommandParser = require("./utils/CommandParser");
const commandOrquester = require("./utils/InitCommand");
const commandParser = new CommandParser();

sulla.create().then(async client => await start(client));

async function start(client) {
  client.onMessage(async message => {
    console.log(message);
    try {
      const { body } = message;
      const { command, params } = commandParser.parser(body);
      
      console.log("mensaje", body);
      console.log("comando", command);
      console.log("parametros", params);

      await commandOrquester.execute({
        command,
        params,
        context: message,
        client
      });
    } catch (err) {
      console.log(err);
      client.kill();
    }
  });
}
