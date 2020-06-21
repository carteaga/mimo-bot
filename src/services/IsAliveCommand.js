const moment = require('moment');
const Service = require('../Service');

moment.locale('es');

class IsAliveCommand extends Service {
  constructor() {
    super();
    this.command = '!alive';
    this.start = moment();
  }

  async execute({ context, client }) {
    const { from } = context;
    await client.sendText(from, `Estoy vivo ${this.start.fromNow()}`);
  }
}

module.exports = IsAliveCommand;
