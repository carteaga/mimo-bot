const fs = require('fs');
const debug = require('debug')('app:server');
const normalizedPath = require('path').join(__dirname, 'services');
const CommandOrquester = require('./CommandOrquester');
const { config } = require('./config');

const { excludeCommands } = config;

const upperCommandsName = excludeCommands.map((command) =>
  command.toUpperCase()
);

const allCommandFiles = fs.readdirSync(normalizedPath).map((file) => {
  const [name] = file.split('.');
  return { file, name };
});

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
