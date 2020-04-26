const Service = require("../Service");
const { getUrl } = require("../utils/getUrl");

class TransantiagoCommand extends Service {
  constructor() {
    super();
    this._command = "!tran";
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const busStop = params[0] || "";
    let msg = "Me falta saber el paradero, ej: !tran pa440";

    if (busStop != "") {
      const response = await getUrl(
        `https://api.adderou.cl/ts/?paradero=${busStop}`
      );
      if (response) {
        const { id, servicios, descripcion } = response;

        if (id != "NULL") {
          msg = `🚏${id} ${descripcion}\n`;
          servicios.forEach(data => {
            const { servicio, valido } = data;

            if (valido == 1) {
              const { tiempo, patente } = data;
              msg += `🚍${servicio} [${patente}]: ${tiempo}\n`;
            } else msg += `🚍${servicio}: fuera de servicio\n`;
          });
        } else {
          msg = "No conozco ese paradero.";
        }
      } else {
        msg = "No está disponible el servicio, lo siento.";
      }
    }

    await client.sendText(from, msg);
  }
}

module.exports = TransantiagoCommand;
