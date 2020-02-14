const { getUrl } = require("../../utils/getUrl");

class HoroscopoCommand {
  constructor() {
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
      "pisis"
    ];

    let sign = params.length ? params[0] : "";
    sign = this.cleanText(sign).toLowerCase();

    if (signs.indexOf(sign) > -1) {
      const response = await getUrl("https://api.adderou.cl/tyaas/");
      const { horoscopo } = response;
      const data = horoscopo[sign];

      await client.sendText(
        from,
        `⚖️: ${data.nombre}\n🗓️: ${data.fechaSigno}\n💘: ${data.amor}\n⚕️: ${data.salud}\n💰: ${data.dinero}\n🎨: ${data.color}\n🔢: ${data.numero}\n`
      );
    } else {
      await client.sendText(from, "🤷‍♂️");
    }
  }
}

module.exports = HoroscopoCommand;
