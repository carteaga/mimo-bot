const debug = require('debug')('app:server');
const LuisParser = require('./LuisParsers');

const luisParser = new LuisParser();

async function processMessage({
  message,
  client,
  commandOrchestrator,
  commandParser,
  errorHandler
}) {
  const { body, from, type, caption, chatId, id } = message;
  const regex = /(^!.*)|(mbot|bot|mimo-bot|mimo\s+bot)/i;
  const commandRegex = /^!.*/;
  const rawMessage = type !== 'chat' ? caption : body;

  if (regex.test(rawMessage)) {
    let messageProcessed = rawMessage;

    if (!commandRegex.test(rawMessage)) {
      messageProcessed = await luisParser.parser(rawMessage);
    }

    const { command, params } = commandParser.parser(messageProcessed);
    debug(
      `- ${from} envia: ${rawMessage} (${type}) = commando "${command}", parametros [${params}]`
    );

    try {
      await client.simulateTyping(message.from, true);
      await commandOrchestrator.execute({
        command,
        params,
        type,
        context: message,
        client,
      });
    } catch(error) {
      if(errorHandler) {
        errorHandler(error, client, command, params);
      }
    } finally {
      await client.simulateTyping(message.from, false);
      await client.sendSeen(chatId);
      await client.deleteMessage(from, id, false);
    }
  }
}

module.exports = processMessage;
