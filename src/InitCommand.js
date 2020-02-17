const CommandOrquester = require("./CommandOrquester");
const commandOrquester = new CommandOrquester();
const fs = require("fs");
const debug = require("debug")("app:server");
const normalizedPath = require("path").join(__dirname, "services");

fs.readdirSync(normalizedPath).forEach(function(file) {
  const command = require(`./services/${file}`);
  commandOrquester.addCommand(new command());
  debug(`Se ha cargado el comando ${file}`);
});

module.exports = commandOrquester;
