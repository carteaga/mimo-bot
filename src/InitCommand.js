const fs = require('fs');
const debug = require('debug')('app:server');
const normalizedPath = require('path').join(__dirname, 'services');
const CommandOrquester = require('./CommandOrquester');

const commandOrquester = new CommandOrquester();

fs.readdirSync(normalizedPath).forEach((file) => {
  /* eslint-disable global-require */
  // eslint-disable-next-line import/no-dynamic-require
  const Command = require(`./services/${file}`);
  commandOrquester.addCommand(new Command());
  debug(`Se ha cargado el comando ${file}`);
});

module.exports = commandOrquester;
