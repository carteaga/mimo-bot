class RollCommand {
  constructor() {
    this._command = "!roll";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname }
    } = context;
    const number = Number.parseInt(params[0]) || 6;
    const result = Math.floor(Math.random() * number) + 1;
    await client.sendText(from, `🎲${pushname} haz lanzado ${result} de ${number} 🎲`); 
  }
}

module.exports = RollCommand;
