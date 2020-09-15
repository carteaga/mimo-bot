const moment = require('moment');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class HoroscopoCommand extends Service {
  constructor() {
    super();
    this.command = '!horoscopo';
    this.help = 'Horóscopo de la inigualable tía yoli. !horoscopo [tu signo]';
    this.info = {
      title: null,
      data: null,
    };
    this.signs = [
      'aries',
      'tauro',
      'geminis',
      'cancer',
      'leo',
      'libra',
      'escorpion',
      'sagitario',
      'capricornio',
      'acuario',
      'piscis',
    ];
  }

  cleanText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  async updateInfo() {
    const response = await getUrl('https://api.xor.cl/tyaas/');

    if (response) {
      this.info.title = `-=== Horóscopo ${response.titulo || ''} ===-`;
      this.info.data = response.horoscopo;
    }
  }

  formatMessage(data, title) {
    return [
      `${title}`,
      `⚖️: ${data.nombre}`,
      `🗓️: ${data.fechaSigno}`,
      `💘: ${data.amor}`,
      `⚕️: ${data.salud}`,
      `💰: ${data.dinero}`,
      `🎨: ${data.color}`,
      `🔢: ${data.numero}`,
      '```creditos a Yolanda Sultana y a @eduardo```',
    ].join('\n\r');
  }

  async execute({ params, context, client }) {
    const { from } = context;

    let sign = params.length ? params[0] : '';
    sign = this.cleanText(sign).toLowerCase();
    let msg = 'No conozco ese signo. Intenta otra vez.';

    if (this.signs.indexOf(sign) > -1) {
      await this.updateInfo();
      const { data: horoscopo, title } = this.info;

      if (horoscopo) {
        msg = this.formatMessage(horoscopo[sign], title);
      } else {
        msg = 'Disculpame, no pude obtener el horóscopo.';
      }
    }

    await client.sendText(from, msg);
  }
}

module.exports = HoroscopoCommand;
