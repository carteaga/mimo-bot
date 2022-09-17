const Service = require('../core/Service');

const REPO_BOT = 'https://github.com/carteaga/mimo-bot';

class GetRepo extends Service {
  constructor() {
    super();
    this.command = '!repo';
    this.help = 'Obtiene el repo del bot!';
  }

  async execute({ context, client }) {
    const { from } = context;

    await client.sendText(from, REPO_BOT);
  }
}

module.exports = GetRepo;
