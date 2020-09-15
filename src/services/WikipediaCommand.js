const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class WikipediaCommand extends Service {
  constructor() {
    super();
    this.command = '!wiki';
    this.help = 'Búsca algo en wikipedia. !wiki [búsqueda]';
    
  }

  async execute({ params, context, client }) {
    const { from } = context;
    const search = params.join(' ');
    const response = await getUrl(
      `https://es.wikipedia.org/w/api.php?action=opensearch&search=${search}&limit=10&format=json`
    );

    if (response) {
      let reply = 'Resultados:\n';
      response[3].forEach((link) => {
        reply += `${link}\n\r`;
      });
      await client.sendText(from, reply);
    } else {
      await client.sendText(from, '🤷‍♂️ Wiki no conoce lo que buscas');
    }
  }
}

module.exports = WikipediaCommand;
