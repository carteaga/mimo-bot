const Service = require("../Service");
const { getUrl } = require("../../utils/getUrl");

class HoroscopoCommand extends Service {
  constructor() {
    super();
    this._command = "!horoscopo";
  }

  get command() {
    return this._command;
  }

  cleanText(text) {
    return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const signs = [
      "aries",
      "tauro",
      "geminis",
      "cancer",
      "leo",
      "libra",
      "escorpion",
      "sagitario",
      "capricornio",
      "acuario",
      "piscis"
    ];

    let sign = params.length ? params[0] : "";
    sign = this.cleanText(sign).toLowerCase();
    let msg = "🤷‍♂️";

    if (signs.indexOf(sign) > -1) {
      const response = await getUrl("https://api.adderou.cl/tyaas/");
      if (response) {
        const { horoscopo } = response;
        const data = horoscopo[sign];

        msg = [
          `⚖️: ${data.nombre}`,
          `🗓️: ${data.fechaSigno}`,
          `💘: ${data.amor}`,
          `⚕️: ${data.salud}`,
          `💰: ${data.dinero}`,
          `🎨: ${data.color}`,
          `🔢: ${data.numero}`
        ].join("\n\r");
      } else {
        msg = "No hay horóscopo";
      }
    }

    await client.sendText(from, msg);
  }
}

module.exports = HoroscopoCommand;
