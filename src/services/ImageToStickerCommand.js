const { decryptMedia } = require('@open-wa/wa-automate');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

const uaOverride =
  'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15';

class ImageToSticker extends Service {
  constructor() {
    super();
    this.command = '!sticker';
    this.help = 'Pasa una imagen a un sticker. envía una imagen con el texto !sticker. También funciona url !sticker [url]';
    this.types = ['image', 'chat'];
  }

  async imageToSticker(context, client) {
    const { mimetype, from } = context;
    const mediaData = await decryptMedia(context, uaOverride);
    await client.sendImageAsSticker(
      from,
      `data:${mimetype};base64,${mediaData.toString('base64')}`
    );
  }

  async getImageWebp(url) {
    const img = await getUrl(url, { responseType: 'arraybuffer' });
    if (img) {
      return `data:image/png;base64,${Buffer.from(img, 'binary').toString(
        'base64'
      )}`;
    }
    return undefined;
  }

  async imageToUrl(context, client, params) {
    const { from } = context;
    const url = params[0] || '';
    const extension = this.getExtensionImageToUrl(url);

    if (extension === '') {
      await client.sendText(from, 'Extensión no soportada');
      return;
    }

    if (extension === 'webp') {
      const img = await this.getImageWebp(url);
      if (img) {
        await client.sendImageAsSticker(from, img);
      } else {
        await client.sendText(from, 'No pude obtener la imagen');
      }
    } else {
      try {
        await client.sendStickerfromUrl(from, url);
      } catch (error) {
        await client.sendText(from, 'No pude obtener la imagen');
      }
    }
  }

  getExtensionImageToUrl(url) {
    const validateImageUrl = /https?:[/|.|\w|\s|-]*\.((?:jpg|gif|png|jpge|webp))/;
    const match = url.match(validateImageUrl);
    if (match && match.length === 2) {
      return match[1];
    }
    return '';
  }

  async execute({ context, client, params }) {
    const { type, quotedMsg, from } = context;

    switch (type) {
      case 'image':
        await this.imageToSticker(context, client);
        break;
      case 'chat':
        if (quotedMsg && quotedMsg.type === 'image') {
          await this.imageToSticker({
            ...quotedMsg,
            from
          }, client);
        } else {
          await this.imageToUrl(context, client, params);
        }
        break;
      default:
        break;
    }
  }
}

module.exports = ImageToSticker;
