const moment = require('moment');
const Service = require('../core/Service');

moment.locale('es');

class IsAliveCommand extends Service {
  constructor() {
    super();
    this.command = '!alive';
    this.help = 'Quieres saber cuanto llevo con vida?';
    this.start = moment();
  }

  async execute({ context, client }) {
    const { from } = context;
    await client.sendText(from, `Estoy vivo ${this.start.fromNow()}`);
  }
}

module.exports = IsAliveCommand;
