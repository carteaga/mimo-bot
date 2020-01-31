class HelloCommand {
  constructor() {
    this._command = "!hello";
  }

  get command() {
    return this._command;
  }

  execute({ command, params, context }) {
    const {
      sender: { pushname }
    } = context;
    const name = params.lenght ? params.join(" ") : pushname;
    return `🤖🖐 Hola ${name}`;
  }
}

module.exports = HelloCommand;
