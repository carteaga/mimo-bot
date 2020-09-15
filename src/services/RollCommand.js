const Service = require('../Service');

class RollCommand extends Service {
  constructor() {
    super();
    this.command = '!roll';
    this.help = 'Lanza los dados. !roll [número máximo]';
  }

  async execute({ params, context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;
    const number = Number.parseInt(params[0], 10) || 6;
    const result = Math.floor(Math.random() * number) + 1;
    await client.sendText(
      from,
      `🎲${pushname} has lanzado ${result} de ${number}`
    );
  }
}

module.exports = RollCommand;
