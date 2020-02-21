const phrases = require('../../utils/phrases');

class BronceCommand {
  
  constructor() {
    this._command = "!bronce";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const randomNumber = Math.floor(Math.random() * phrases.length);
    const prhase = phrases[randomNumber];

    await client.sendText(from, prhase);
  }
}

module.exports = BronceCommand;
