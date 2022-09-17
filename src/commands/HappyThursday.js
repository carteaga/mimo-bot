const Service = require('../core/Service');
const { happyThursday } = require('../config');
const { gif } = happyThursday;
class HappyThursday extends Service {
  constructor() {
    super();
    this.command = '!jueves';
    this.help = 'Feliz jueves!';
  }

  execute({ context, client }) {
    const { from } = context;

    return client.sendGiphyAsSticker(from, gif);
  }
}

module.exports = HappyThursday;
