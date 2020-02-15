class HelloCommand {
  constructor() {
    this._command = "!hello";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname },
      from
    } = context;
    const name = params.length ? params.join(" ") : pushname;
    await client.sendText(from, `🤖🖐 Hola ${name}`); 
  }
}

module.exports = HelloCommand;
