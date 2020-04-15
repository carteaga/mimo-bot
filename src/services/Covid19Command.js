const { getUrl } = require("../../utils/getUrl");
const numeral = require("numeral");
const Service = require("../Service");

class Covid19Command extends Service {
  constructor() {
    super();
    this._command = "!covid";
  }

  get command() {
    return this._command;
  }

  cleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  formatNumber(number) {
    return numeral(number).format("0,0");
  }

  generateMsgAllCases(response) {
    return [
      `Resumen mundial`,
      `Casos: ${this.formatNumber(response.cases)}`,
      `Muertes: ${this.formatNumber(response.deaths)}`,
      `Recuperados: ${this.formatNumber(response.recovered)}`,
    ].join("\n");
  }

  generateCountryMessage(response) {
    const country = response.country,
      cases = this.formatNumber(response.cases),
      todayCases = this.formatNumber(response.todayCases),
      deaths = this.formatNumber(response.deaths),
      todayDeaths = this.formatNumber(response.todayDeaths),
      active = this.formatNumber(response.active),
      recovered = this.formatNumber(response.recovered),
      critical = this.formatNumber(response.critical);

    return [
      `Resumen de ${country}`,
      `Casos: ${cases} | Hoy: ${todayCases} | Activos: ${active}`,
      `Muertes: ${deaths} | Hoy: ${todayDeaths}`,
      `Recuperados: ${recovered} | Criticos: ${critical}`,
    ].join("\n");
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const resource = "https://coronavirus-19-api.herokuapp.com";
    const country = params.join(" ") || "chile";
    let msg = "";

    const response =
      country.toLowerCase() == "mundial"
        ? await getUrl(`${resource}/all`)
        : await getUrl(
            `${resource}/countries/${encodeURI(
              this.cleanText(country.toLowerCase())
            )}`
          );

    if (response == "Country not found") {
      msg = "No encontré el país, intentalo en inglés.";
    } else if (response != "") {
      msg =
        country.toLowerCase() == "mundial"
          ? this.generateMsgAllCases(response)
          : this.generateCountryMessage(response);
    } else {
      msg = "No puedo obtener los datos solicitados.";
    }

    await client.sendText(from, msg);
  }
}

module.exports = Covid19Command;
