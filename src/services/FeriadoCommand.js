const moment = require('moment');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

moment.locale('es');

class FeriadoCommand extends Service {
  constructor() {
    super();
    this.command = '!feriado';
    this.help = 'Lista los feriados del año en chile. !feriado [número] o !feriado';
  }

  isHolidayValid(date) {
    return function filter(holiday) {
      const dateHoliday = moment(holiday.fecha);
      return date <= dateHoliday;
    };
  }

  async execute({ params, context, client }) {
    const currentDate = moment();
    const { from } = context;
    const year = currentDate.year();
    const response = await getUrl(
      `https://apis.digital.gob.cl/fl/feriados/${year}`
    );
    let msg = 'No puedo ver los feriados, lo siento.';
    let limitHolidays = Number.parseInt(params[0], 10) || 5;

    if (response) {
      const maxHolidays = response.length;

      if (limitHolidays > maxHolidays) limitHolidays = maxHolidays;

      if (limitHolidays < 0) limitHolidays = 1;

      const holidayRemaining = response
        .filter(this.isHolidayValid(currentDate))
        .slice(0, limitHolidays);

      msg = `Próximos ${limitHolidays || ''} feriados\n`;
      holidayRemaining.forEach((holiday) => {
        const { nombre, fecha, irrenunciable, tipo } = holiday;
        const isReligious = tipo === 'Religioso' ? 'Si' : 'No';
        const isRenunciable = irrenunciable === 1 ? 'Si' : 'No';
        const date = moment(fecha);

        msg += [
          `*${date.format(
            'D-MMM (dd)'
          )}* \t_Rel? ${isReligious}\tRen? ${isRenunciable}_`,
          `\`\`\`"${nombre}"\`\`\``,
          `\`\`\`(faltan ${date.fromNow(true)})\`\`\``,
          '',
          '',
        ].join('\n');
      });
    }

    await client.sendText(from, msg);
  }
}

module.exports = FeriadoCommand;
