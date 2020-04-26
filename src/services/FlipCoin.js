const Service = require("../Service");

class FlipCoin extends Service {
  constructor() {
    super();
    this._command = "!flipcoin";
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;

    const coin = Math.floor(Math.random() * 2) ? "cara" : "sello";

    await client.sendText(
      from,
      `${pushname} lanzó la moneda, ha salido: *${coin}*`
    );
  }
}

module.exports = FlipCoin;
