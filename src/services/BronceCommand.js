const phrases = require('../utils/phrases');
const Service = require('../Service');

class BronceCommand extends Service {
  constructor() {
    super();
    this.command = '!bronce';
    this.help = 'Selecciona una frase para la posteriedad';
  }

  async execute({ context, client }) {
    const { from } = context;
    const randomNumber = Math.floor(Math.random() * phrases.length);
    const prhase = phrases[randomNumber];

    await client.sendText(from, prhase);
  }
}

module.exports = BronceCommand;
