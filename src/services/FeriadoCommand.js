const { getUrl } = require("../../utils/getUrl");
const moment = require("moment");
moment.locale("es");

class FeriadoCommand {
  constructor() {
    this._command = "!feriado";
  }

  get command() {
    return this._command;
  }

  isHolidayValid(date) {
    return function filter(holiday) {
      const dateHoliday = moment(holiday.fecha);
      return date <= dateHoliday;
    };
  }

  async execute({ command, params, context, client }) {
    const currentDate = moment();
    const maxHolidays = 5;
    const { from } = context;
    const year = currentDate.year();
    const response = await getUrl(
      `https://apis.digital.gob.cl/fl/feriados/${year}`
    );
    let msg = "No puedo ver los feriados, lo siento.";

    if (response) {
      const holidayRemaining = response
        .filter(this.isHolidayValid(currentDate))
        .slice(0, maxHolidays);

      msg = `Próximos ${maxHolidays || ""} feriados\n`;
      holidayRemaining.forEach(holiday => {
        const { nombre, fecha, irrenunciable, tipo } = holiday;
        const isReligious = tipo == "Religioso" ? "Si" : "No";
        const isRenunciable = irrenunciable == 1 ? "Si" : "No";
        const date = moment(fecha);

        msg += [
          `*${date.format("D-MMM (dd)")}* \t_Rel? ${isReligious}\tRen? ${isRenunciable}_`,
          `\`\`\`"${nombre}"\`\`\``,
          `\`\`\`(faltan ${date.fromNow(true)})\`\`\``,
          "",
          ""
        ].join("\n");
      });
    }

    await client.sendText(from, msg);
  }
}

module.exports = FeriadoCommand;
