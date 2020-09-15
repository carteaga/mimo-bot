const Service = require('../Service');

class Help extends Service {
  constructor() {
    super();
    this.command = '!help';
    this.help = 'Lista todos los comandos';
  }

  async execute({ client, commands, context }) {
    const { from } = context;
    const title = '🚀 Comandos mimo-bot 🚀';
    const helpTexts = commands.map(
      ({ command, help }) => `· *${command}*: ${help}`
    );
    helpTexts.sort();
    helpTexts.unshift(title);
    await client.sendText(from, helpTexts.join('\n'));
  }
}

module.exports = Help;
