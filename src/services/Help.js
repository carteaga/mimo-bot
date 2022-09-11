const Service = require('../Service');
const spoilerMessages = require('../utils/spoilerMessage');

class Help extends Service {
  constructor() {
    super();
    this.command = ['!help', '!h'];
    this.help = 'Lista todos los comandos';
  }

  async execute({ client, commands, context }) {
    const { from } = context;
    const title = spoilerMessages('🚀 Comandos mimo-bot 🚀');

    const helpTexts = commands.map(
      ({ command, help }) => `· *${command}*: ${help}`
    );

    helpTexts.sort();
    helpTexts.unshift(title);
    await client.sendText(from, helpTexts.join('\n'));
  }
}

module.exports = Help;
