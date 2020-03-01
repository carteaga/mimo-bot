class HelloCommand {
  constructor() {
    this._command = "!beer";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname },
      from
    } = context;
    const max = 10;
    let repeat = Number.parseInt(params[0]) || 1;
    repeat = repeat > max ? max : repeat;
    await client.sendText(from, `${'🍺'.repeat(repeat)} para ${name}`);
  }
}

module.exports = HelloCommand;
