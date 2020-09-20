const { Buffer } = require('buffer');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class RandomCat extends Service {
  constructor() {
    super();
    this.command = '!meow';
    this.help = 'Quieres un gatito?';
  }

  getExtensionImageToUrl(url) {
    const validateImageUrl = /https?:[/|.|\w|\s|-]*\.((?:jpg|gif|png|jpge|webp))/;
    const match = url.match(validateImageUrl);
    if (match && match.length === 2) {
      return match[1];
    }
    return '';
  }

  async getImageCat(url) {
    const img = await getUrl(url, { responseType: 'arraybuffer' });

    if (!img) return null;

    const imageBinary = Buffer.from(img, 'binary').toString('base64');
    return `data:image/jpeg;base64,${imageBinary}`;
  }

  async execute({ context, client, params }) {
    const { from } = context;
    const uri = 'https://cataas.com/c?t=sm';
    const img = await this.getImageCat(uri);

    img
      ? await client.sendImage(
          from,
          img,
          'gatito.jpeg',
          'un gatito para tu vida'
        )
      : await client.sendText(
          from,
          'lo siento, pero se agotaron los gatos. Esperemos unos minutos.'
        );
  }
}

module.exports = RandomCat;
