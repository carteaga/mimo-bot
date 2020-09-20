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

  async getImageCat() {
    const MAX_TRY = 3;

    let url = null;
    let ext = null;
    let count = 3;

    do {
      url = await getUrl('https://aws.random.cat/meow');
      ext = url ? this.getExtensionImageToUrl(url.file) : null;
      count += 1;
    } while (ext === 'gif' && count <= MAX_TRY);

    if (!url) return null;

    const img = await getUrl(url.file, { responseType: 'arraybuffer' });

    if (!img) return null;

    const imageBinary = Buffer.from(img, 'binary').toString('base64');
    return `data:image/${ext};base64,${imageBinary}`;
  }

  async execute({ context, client }) {
    const { from } = context;
    const img = await this.getImageCat();

    img
      ? await client.sendImage(
          from,
          img,
          'gatito.jpg',
          'un gatito para tu vida'
        )
      : await client.sendText(
          from,
          'lo siento, pero se agotaron los gatos. Esperemos unos minutos.'
        );
  }
}

module.exports = RandomCat;
