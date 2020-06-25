const moment = require('moment');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class HoroscopoCommand extends Service {
  constructor() {
    super();
    this.command = '!horoscopo';
    this.info = {
      date: null,
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
    const today = moment().format('DDMMyyy');

    if (this.info.date !== today) {
      const response = await getUrl('https://api.adderou.cl/tyaas/', {
        timeout: 1000,
      });

      if (response) {
        this.info = {
          date: today,
          data: response.horoscopo,
        };
      }
    }
  }

  formatMessage(data) {
    return [
      `⚖️: ${data.nombre}`,
      `🗓️: ${data.fechaSigno}`,
      `💘: ${data.amor}`,
      `⚕️: ${data.salud}`,
      `💰: ${data.dinero}`,
      `🎨: ${data.color}`,
      `🔢: ${data.numero}`,
    ].join('\n\r');
  }

  async execute({ params, context, client }) {
    const { from } = context;

    let sign = params.length ? params[0] : '';
    sign = this.cleanText(sign).toLowerCase();
    let msg = 'No conozco ese signo. Intenta otra vez.';

    if (this.signs.indexOf(sign) > -1) {
      await this.updateInfo();
      const { data: horoscopo } = this.info;

      if (horoscopo) {
        msg = this.formatMessage(horoscopo[sign]);
      } else {
        msg = 'Disculpa, no pude obtener el horóscopo.';
      }
    }

    await client.sendText(from, msg);
  }
}

module.exports = HoroscopoCommand;
