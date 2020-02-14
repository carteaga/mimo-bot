const sulla = require("sulla-hotfix");
const CommandParser = require("./src/CommandParser");
const commandOrquester = require("./src/InitCommand");
const commandParser = new CommandParser();
const tosBlockGuaranteed =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.82 Safari/537.36 Vivaldi/2.3.1440.30";


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

sulla.create('session',{
  throwErrorOnTosBlock:true
}, tosBlockGuaranteed).then(async client => await start(client));
