const LuisParser = require("./LuisParsers");
const debug = require("debug")("app:server");

const luisParser = new LuisParser();

async function processMessage({
  message,
  client,
  commandOrchestrator,
  commandParser,
}) {
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

    await commandOrchestrator.execute({
      command,
      params,
      type,
      context: message,
      client,
    });
  }

  await client.sendSeen(chatId);
}

module.exports = processMessage;
