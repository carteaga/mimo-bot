const { create, all } = require('mathjs');

const math = create(all);
const limitedEvaluate = math.evaluate;
const message = 'No puedo hacer esto';
math.import(
  {
    import: () => message,
    createUnit: () => message,
    evaluate: () => message,
    parse: () => message,
    simplify: () => message,
    derivative: () => message,
  },
  { override: true }
);

function evaluateMathExpression(expression) {
  const result = limitedEvaluate(expression);
  return result;
}

module.exports = evaluateMathExpression;
