const Service = require('../Service');

class Spoiler extends Service {
  constructor() {
    super();
    this.command = '!spoiler';
    this.help = 'Genera un spoiler de un text (funciona solo en android)';
  }

  async execute({ params, client, context }) {
    const { from } = context;
    const message = params.join(' ');
    const title = '[SPOILER]';
    const separator = '\r\n'.repeat(3);
    const padding = '\u200B'.repeat(4000);
    const spoilerMessage = `${title}${separator}${padding}${message}`;

    await client.sendText(from, spoilerMessage);
  }
}

module.exports = Spoiler;
