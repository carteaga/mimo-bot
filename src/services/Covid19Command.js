const numeral = require('numeral');
const { getUrl } = require('../utils/getUrl');
const Service = require('../Service');

class Covid19Command extends Service {
  constructor() {
    super();
    this.command = '!covid';
  }

  cleanText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  formatNumber(number) {
    return numeral(number).format('0,0');
  }

  generateMsgAllCases(response) {
    return [
      `Resumen mundial`,
      `Casos: ${this.formatNumber(response.cases)}`,
      `Muertes: ${this.formatNumber(response.deaths)}`,
      `Recuperados: ${this.formatNumber(response.recovered)}`,
    ].join('\n');
  }

  generateCountryMessage(response) {
    const { country } = response;
    const cases = this.formatNumber(response.cases);
    const todayCases = this.formatNumber(response.todayCases);
    const deaths = this.formatNumber(response.deaths);
    const todayDeaths = this.formatNumber(response.todayDeaths);
    const active = this.formatNumber(response.active);
    const recovered = this.formatNumber(response.recovered);
    const critical = this.formatNumber(response.critical);

    return [
      `Resumen de ${country}`,
      `Casos: ${cases} | Hoy: ${todayCases} | Activos: ${active}`,
      `Muertes: ${deaths} | Hoy: ${todayDeaths}`,
      `Recuperados: ${recovered} | Criticos: ${critical}`,
    ].join('\n');
  }

  async execute({ params, context, client }) {
    const { from } = context;
    const resource = 'https://coronavirus-19-api.herokuapp.com';
    const country = params.join(' ') || 'chile';
    let msg = '';

    const response =
      country.toLowerCase() === 'mundial'
        ? await getUrl(`${resource}/all`)
        : await getUrl(
            `${resource}/countries/${encodeURI(
              this.cleanText(country.toLowerCase())
            )}`
          );

    if (response === 'Country not found') {
      msg = 'No encontré el país, intentalo en inglés.';
    } else if (response !== '') {
      msg =
        country.toLowerCase() === 'mundial'
          ? this.generateMsgAllCases(response)
          : this.generateCountryMessage(response);
    } else {
      msg = 'No puedo obtener los datos solicitados.';
    }

    await client.sendText(from, msg);
  }
}

module.exports = Covid19Command;
