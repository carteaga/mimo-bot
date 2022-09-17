const PrettyError = require('pretty-error');
const { config } = require('../config/index');

const pe = new PrettyError();

async function errorHandler(error, client2, command, params) {
  const { phonePing } = config;
  if(!phonePing) {
    return;
  }

  const message = `Error:\nc: ${command} - p: ${params}`;
  // eslint-disable-next-line no-console
  console.log(`Error:\nc: ${command} - p: ${params}`);
  // eslint-disable-next-line no-console
  console.log(pe.render(error));
  await client2.sendText(phonePing, `${message}\nstack${error.stack}`);
}

module.exports = errorHandler;
