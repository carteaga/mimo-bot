const { decryptMedia } = require('@open-wa/wa-automate');
const Service = require('../Service');

const uaOverride =
  'WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15';

class ImageToSticker extends Service {
  constructor() {
    super();
    this.command = '!sticker';
    this.types = ['image'];
  }

  async execute({ context, client }) {
    const { mimetype, from } = context;
    const mediaData = await decryptMedia(context, uaOverride);
    await client.sendImageAsSticker(
      `data:${mimetype};base64,${mediaData.toString('base64')}`,
      from
    );
  }
}

module.exports = ImageToSticker;
