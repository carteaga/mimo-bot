class RollCommand {
  constructor() {
    this._command = "!roll";
  }

  get command() {
    return this._command;
  }

  execute({ command, params, context }) {
    const {
      sender: { pushname }
    } = context;
    const number = Number.parseInt(params[0]) || 6;
    const result = Math.floor(Math.random() * number) + 1;
    return `🎲${pushname} haz lanzado ${result} de ${number} 🎲`;
  }
}

module.exports = RollCommand;
