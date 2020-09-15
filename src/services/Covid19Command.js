const { getUrl } = require('../utils/getUrl');
const formatNumber = require('../utils/formatNumber');
const Service = require('../Service');

class Covid19Command extends Service {
  constructor() {
    super();
    this.command = '!covid';
    this.help = 'Información sobre covid 19. ej: !covid [país]';
  }

  cleanText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  generateMsgAllCases(response) {
    return [
      `Resumen mundial`,
      `Casos: ${formatNumber(response.cases)}`,
      `Muertes: ${formatNumber(response.deaths)}`,
      `Recuperados: ${formatNumber(response.recovered)}`,
    ].join('\n');
  }

  generateCountryMessage(response) {
    const { country } = response;
    const cases = formatNumber(response.cases);
    const todayCases = formatNumber(response.todayCases);
    const deaths = formatNumber(response.deaths);
    const todayDeaths = formatNumber(response.todayDeaths);
    const active = formatNumber(response.active);
    const recovered = formatNumber(response.recovered);
    const critical = formatNumber(response.critical);

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
