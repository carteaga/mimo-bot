const Service = require('../core/Service');

class BeerCommand extends Service {
  constructor() {
    super();
    this.command = '!beer';
    this.help = 'Quieres una 🍺?';
    this.beerTypes = [
      'Ale',
      'Altbier',
      'Amber ale',
      'Barley wine',
      'Bitter',
      'Brown ale',
      'Dark ale',
      'De abadía',
      'Fruit beer',
      'Golden ale',
      'Blonde ale',
      'Honey ale',
      'Imperial brown ale',
      'Imperial IPA',
      'Imperial stout',
      'India pale ale (IPA)',
      'India red ale (IRA)',
      'Kölsch',
      'Light beer',
      'Mild ale',
      'Old ale',
      'Pale ale',
      'Porter',
      'Red ale',
      'Saison',
      'Scotch ale',
      'Sour',
      'Stout',
      'Strong ale',
      'Trapista',
      'Weissbier',
      'Baltic porter',
      'Black lager',
      'Bock',
      'Lager',
      'Malta',
      'Múnich helles',
      'Pilsner',
      'Sin alcohol',
      'Steam beer',
      'Vienna märzen',
    ];
  }

  async execute({ params, context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;
    const max = 5;
    const beerType =
      this.beerTypes[Math.floor(Math.random() * this.beerTypes.length)];
    let repeat = Number.parseInt(params[0], 10) || 1;
    repeat = repeat > max ? max : repeat;
    await client.sendText(
      from,
      `${'🍺'.repeat(repeat)} *${beerType}* \`\`\`para\`\`\` ${pushname}`
    );
  }
}

module.exports = BeerCommand;
