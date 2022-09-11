const Service = require('../Service');

const HAPPY_THUESDAY_GIF =
  'https://media.giphy.com/media/5nS2CCNuGyg5w3Eevt/giphy.gif';

class HappyThursday extends Service {
  constructor() {
    super();
    this.command = '!jueves';
    this.help = 'Feliz jueves!';
  }

  async execute({ context, client }) {
    const { from } = context;

    await client.sendGiphyAsSticker(from, HAPPY_THUESDAY_GIF);
  }
}

module.exports = HappyThursday;
