const Service = require('../core/Service');
const formatNumber = require('../utils/formatNumber');
const evaluateMathExpression = require('../utils/evaluateMathExpression');

class MathExpressions extends Service {
  constructor() {
    super();
    this.command = '!math';
    this.help = 'Resuelve un problema matematico. !math 1+1';
  }

  format(result) {
    return Number(result) ? formatNumber(result) : result;
  }

  async execute({ params, context, client }) {
    const { from, id } = context;

    if (!params.length) {
      await client.reply(from, 'No encontre la expressión matemática.', id);
      return;
    }

    const expression = params.join(' ');
    let message = '';
    try {
      const result = evaluateMathExpression(expression);
      message = `${this.format(result)}`;
    } catch (error) {
      message = 'Tu formula no es correcta, intenta nuevamente';
    }

    await client.reply(from, message, id);
  }
}

module.exports = MathExpressions;
