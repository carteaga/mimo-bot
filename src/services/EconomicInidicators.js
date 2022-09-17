const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');
const moment = require('moment');

moment.locale('es');

const API = 'https://mindicador.cl/api';

class EconomicInidicators extends Service {
  constructor() {
    super();
    this.command = ['!indicador', '!ind'];
    this.help = 'Obtiene los indicadores diarios de chile';
  }

  formatValue({ codigo, valor, unidad_medida }) {
    return `${codigo}: ${valor} ${unidad_medida}`;
  }

  format(values) {
    const { fecha, uf, dolar, dolar_intercambio, euro, utm } = values;

    const date = moment(fecha).format('LL');

    const indicators = [uf, dolar, dolar_intercambio, euro, utm].map(
      this.formatValue
    );

    return [`Indicadores ${date}`, ...indicators].join('\n');
  }

  async execute({ context, client }) {
    const { from } = context;

    const values = await getUrl(API);

    if (!values) return;

    const message = this.format(values);

    await client.sendText(from, message);
  }
}

module.exports = EconomicInidicators;
