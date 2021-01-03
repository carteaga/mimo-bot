const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

const MESSAGE_NOT_FOUND = '🤷‍♂️ Wiki no conoce lo que buscas';

class WikipediaCommand extends Service {
  constructor() {
    super();
    this.command = '!wiki';
    this.help = 'Búsca algo en wikipedia. !wiki [búsqueda]';
  }

  async execute({ params, context, client }) {
    if (!params.length) {
      await client.sendText(from, MESSAGE_NOT_FOUND);
      return;
    }

    const { from } = context;
    const search = params.join(' ').trim();
    const response = await getUrl(
      `https://es.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=10&format=json`
    );

    if (response) {
      const reply = response[3].map((link) => link);
      reply.unshift('Resultados');

      await client.sendText(from, reply.join('\n'));
    } else {
      await client.sendText(from, MESSAGE_NOT_FOUND);
    }
  }
}

module.exports = WikipediaCommand;
