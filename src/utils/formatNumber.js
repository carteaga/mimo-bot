const numeral = require('numeral');

const numeralCl = {
  delimiters: {
    thousands: '.',
    decimal: ',',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  currency: {
    symbol: '$',
  },
};

numeral.register('locale', 'cl', numeralCl);
numeral.locale('cl');

function formatNumber(number) {
  return numeral(number).format('0,0.[0000]');
}

module.exports = formatNumber;
