const { getUrl } = require('../utils/getUrl');
const Service = require('../Service');
const { isNumber } = require('../utils/validations');

const MAX_FACTS = 3;
const FACT_URL = 'https://uselessfacts.jsph.pl//random.json?language=en';

class UselessFact extends Service {
  constructor() {
    super();
    this.command = '!ufact';
    this.help = 'Obtén algún dato inservible. !ufact [cantidad]. 3 max.';
  }

  async getFact() {
    const { text } = await getUrl(FACT_URL);
    return text;
  }

  async sendFact(client, from) {
    const text = await this.getFact();
    text && client.sendText(from, text);
  }

  async execute({ context, client, params }) {
    const { from } = context;
    const [numberFact] = params;

    if (!isNumber(numberFact)) {
      this.sendFact(client, from);
      return;
    }

    const facts = numberFact > MAX_FACTS ? MAX_FACTS : Number(numberFact);
    const promises = Array(facts)
      .fill(0)
      .map((_) => this.sendFact(client, from));
    Promise.all(promises);
  }
}

module.exports = UselessFact;
