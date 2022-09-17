const Service = require('../core/Service');

class FlipCoin extends Service {
  constructor() {
    super();
    this.command = '!flipcoin';
    this.help = 'Quieres que te ayude con una decisión. Lanza una moneda!';
  }

  async execute({ context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;

    const coin = Math.floor(Math.random() * 2) ? 'cara' : 'sello';

    await client.sendText(
      from,
      `${pushname} lanzó una moneda, ha salido: *${coin}*`
    );
  }
}

module.exports = FlipCoin;
