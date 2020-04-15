const { getUrl } = require("../../utils/getUrl");
const Service = require("../Service");

class ChuckPhrasesCommand extends Service {
  constructor() {
    super();
    this._command = "!chuck";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const data = await getUrl("https://api.chucknorris.io/jokes/random");
    await client.sendText(from, `${data.value}`);
  }
}

module.exports = ChuckPhrasesCommand;
