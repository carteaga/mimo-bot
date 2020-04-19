const Service = require("../Service");
const moment = require('moment');
moment.locale('es');

class IsAliveCommand extends Service {
  constructor() {
    super();
    this._command = "!alive";
    this._start = moment();
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const end = new Date();

    await client.sendText(from, `Estoy vivo ${this._start.fromNow()}`);
  }
}

module.exports = IsAliveCommand;
