const Service = require('../Service');

class Help extends Service {
  constructor() {
    super();
    this.command = ['!help', '!h'];
    this.help = 'Lista todos los comandos';
  }

  async execute({ client, commands, context }) {
    const { from } = context;
    const title = `🚀 Comandos mimo-bot 🚀 ${String.fromCharCode(
      '0x200B'
    ).repeat(2575)}`;
    const helpTexts = commands.map(
      ({ command, help }) => `· *${command}*: ${help}`
    );
    helpTexts.sort();
    helpTexts.unshift(title);
    await client.sendText(from, helpTexts.join('\n'));
  }
}

module.exports = Help;
