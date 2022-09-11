const debug = require('debug')('app:server');

const REGEX_MESSAGE_FOR_BOT = /(^!.*)/i;

async function processMessage({
  message,
  client,
  commandOrchestrator,
  commandParser,
  errorHandler,
}) {
  const { body, from, type, caption, chatId } = message;
  const rawMessage = type !== 'chat' ? caption : body;
  const isMessageForBot = REGEX_MESSAGE_FOR_BOT.test(rawMessage);

  await client.sendSeen(chatId);

  if (!isMessageForBot) return;

  const { command, params } = commandParser.parser(rawMessage);

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
  }
}

module.exports = processMessage;
