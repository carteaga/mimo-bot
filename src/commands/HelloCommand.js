const Service = require('../core/Service');

class HelloCommand extends Service {
  constructor() {
    super();
    this.command = ['!hello', '!hi'];
    this.help = 'Saludame';
  }

  async execute({ params, context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;
    const name = params.length ? params.join(' ') : pushname;
    await client.sendText(from, `🖐🤖 Hola ${name}`);
  }
}

module.exports = HelloCommand;
