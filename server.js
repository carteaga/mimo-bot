const sulla = require("sulla-hotfix");
const CommandParser = require("./utils/CommandParser");
const commandOrquester = require("./utils/InitCommand");
const commandParser = new CommandParser();

sulla.create().then(client => start(client));

function start(client) {
  client.onMessage(message => {
    console.log(message);
    try {
      console.log('mensaje', message.body);
      const { command, params } = commandParser.parser(message.body);
      console.log('comando', command);
      console.log('parametros',params);
      const data = commandOrquester.execute({ command, params, context: message });
      console.log("data", data);
      if(data) client.sendText(message.from, data);
    } catch (err) {
      console.log(err);
    }
  });
}
