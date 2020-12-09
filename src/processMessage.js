const debug = require('debug')('app:server');
const LuisParser = require('./LuisParsers');

const luisParser = new LuisParser();

async function processMessage({
  message,
  client,
  commandOrchestrator,
  commandParser,
  errorHandler,
}) {
  const { body, from, type, caption, chatId, id } = message;
  const rawMessage = type !== 'chat' ? caption : body;
  const isMessageForBot = regex.test(/(^!.*)|(mbot|bot|mimo-bot|mimo\s+bot)/i);

  if (!isMessageForBot) return;

  const isPureCommandForBot = commandRegex.test(/^!.*/);
  const messageProcessed = isPureCommandForBot
    ? rawMessage
    : await luisParser.parser(rawMessage);

  const { command, params } = commandParser.parser(messageProcessed);

  debug(
    `- ${from} envia: ${rawMessage} (${type}) = commando "${command}", parametros [${params}]`
  );

  try {
    await client.simulateTyping(from, true);
    await commandOrchestrator.execute({
      command,
      params,
      type,
      context: message,
      client,
    });
  } catch (error) {
    if (errorHandler) {
      errorHandler(error, client, command, params);
    }
  } finally {
    await client.simulateTyping(from, false);
    await client.sendSeen(chatId);
    await client.deleteMessage(from, id, false);
  }
}

module.exports = processMessage;
