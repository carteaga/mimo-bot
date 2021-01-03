const debug = require('debug')('app:server');
const { raw } = require('express');
const LuisParser = require('./LuisParsers');

const luisParser = new LuisParser();
const REGEX_MESSAGE_FOR_BOT = /(^!.*)|(mbot|bot|mimo-bot|mimo\s+bot)/i;
const REGEX_IS_PURE_COMMAND = /^!.*/;

async function processMessage({
  message,
  client,
  commandOrchestrator,
  commandParser,
  errorHandler,
}) {
  const { body, from, type, caption, chatId, id } = message;
  const rawMessage = type !== 'chat' ? caption : body;
  const isMessageForBot = REGEX_MESSAGE_FOR_BOT.test(rawMessage);

  await client.sendSeen(chatId);

  if (!isMessageForBot) {
    client.deleteMessage(from, id);
    return;
  }

  const isPureCommandForBot = REGEX_IS_PURE_COMMAND.test(rawMessage);
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
    await client.deleteMessage(from, id);
  }
}

module.exports = processMessage;
