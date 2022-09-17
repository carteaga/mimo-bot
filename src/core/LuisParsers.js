const debug = require('debug')('app:luis');
const { escape } = require('querystring');
const { getUrl } = require('../utils/getUrl');
const { config } = require('../config/index');

class LuisParser {
  async parser(message) {
    const request = `${config.luisEndPoint}/apps/${
      config.luisAppId
    }?verbose=true&timezoneOffset=0&subscription-key=${
      config.luisKey
    }&q=${escape(message)}`;

    const response = await getUrl(request);

    if (!response) {
      return message;
    }

    const command = this.getIntention(response);
    const sign = command[0] !== '!' ? '!' : '';
    return `${sign}${command}`;
  }

  getIntention(response) {
    debug('Luis result:', response.topScoringIntent);
    const {
      query,
      topScoringIntent: { intent, score },
      entities,
    } = response;

    let msg = query;
    if (intent && score > 0.7) {
      msg = intent;
      entities.forEach((entity) => {
        msg += ` ${entity.entity}`;
      });
    }
    return msg;
  }
}

module.exports = LuisParser;
