const Service = require('../Service');

class Spoiler extends Service {
  constructor() {
    super();
    this.command = '!spoiler';
    this.help = 'Genera un spoiler de un text';
  }

  async execute({ params, client, context }) {
    const { from } = context;
    const message = params.join(' ');
    const title = '[SPOILER]';
    const separator = String.fromCharCode('0x200B').repeat(2575);
    const spoilerMessage = `${title} ${separator} ${message}`;

    await client.sendText(from, spoilerMessage);
  }
}

module.exports = Spoiler;
