const debug = require('debug')('app:server');
const CommandOrquester = require('./CommandOrquester');
const { config } = require('./config');
const getFilesInFolder = require('./utils/getFilesInFolder');

const { excludeCommands } = config;

const upperCommandsName = excludeCommands.map((command) =>
  command.toUpperCase()
);

const allCommandFiles = getFilesInFolder('services');
const activeCommandFile = allCommandFiles.filter(
  ({ name }) => !upperCommandsName.includes(name.toUpperCase())
);

const commands = activeCommandFile.map(({ file }) => {
  const Command = require(`./services/${file}`);
  debug(`Se ha cargado el comando ${file}`);
  return new Command();
});

const commandOrquester = new CommandOrquester();
commandOrquester.addCommand(...commands);

module.exports = commandOrquester;
