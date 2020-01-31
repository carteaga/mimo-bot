const { getUrl } = require('../getUrl');

class ChuckPhrasesCommand {
  constructor() {
    this._command = "!chuck";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname },
      from
    } = context;
    const data = await getUrl('https://api.chucknorris.io/jokes/random');
    await client.sendText(from, `${pushname} chuck says: "${data.value}"`)
  }
}

module.exports = ChuckPhrasesCommand;