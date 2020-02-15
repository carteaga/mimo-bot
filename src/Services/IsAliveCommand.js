class IsAliveCommand {
  constructor() {
    this._command = "!alive";
    this._start = new Date();
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const end = new Date();
    const diff = this._start - end;

    await client.sendText(from, `Estoy vivo desde ${diff}`);
  }
}

module.exports = IsAliveCommand;
