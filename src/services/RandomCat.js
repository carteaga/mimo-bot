const { Buffer } = require('buffer');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class RandomCat extends Service {
  constructor() {
    super();
    this.command = '!meow';
    this.help = 'Quieres un gatito?';
  }

  async getImageCat(url) {
    const img = await getUrl(url, { responseType: 'arraybuffer' });
    if (img) {
      return `data:image/jpg;base64,${Buffer.from(img, 'binary').toString(
        'base64'
      )}`;
    }
    return undefined;
  }

  async execute({ context, client }) {
    const { from } = context;

    const { file } = await getUrl('https://aws.random.cat/meow');

    if (!file) {
      await client.sendText(
        from,
        `${pushname} lo siento, pero no encontre ningún gato :c`
      );
      return;
    }

    const img = await this.getImageCat(file);

    if (!img) {
      await client.sendText(
        from,
        `${pushname} lo siento, pero no encontre ningún gato :c`
      );
      return;
    }
    await client.sendImage(from, img, 'gatito.jpg', 'un gatito para tu vida');
  }
}

module.exports = RandomCat;
