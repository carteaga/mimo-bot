const { getUrl } = require('../utils/getUrl');
const Service = require('../Service');

class UselessFact extends Service {
  constructor() {
    super();
    this.command = '!ufact';
    this.help = 'Obtén algún dato inservible';
  }

  async execute({ context, client }) {
    const { from } = context;
    const { text } = await getUrl(
      'https://uselessfacts.jsph.pl//random.json?language=en'
    );

    text && client.sendText(from, text);
  }
}

module.exports = UselessFact;
