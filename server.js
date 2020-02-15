const sulla = require("sulla-hotfix");
const CommandParser = require("./src/CommandParser");
const commandOrquester = require("./src/InitCommand");
const commandParser = new CommandParser();
const express = require('express')
const port = process.env.PORT || 8080;

const app = express()
app.use(express.json())

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
}).then(async client => await start(client))
  .catch(e => {
    console.log('error', e);
  });

  app.get('/', async (req, res) => {
    return res.send('Is alive!')
  })

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});