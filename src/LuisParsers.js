const { getUrl } = require("../utils/getUrl");
const { config } = require("./config/index");

class LuisParser {
  async parser(message) {
    const request = `${config.luisEndPoint}/apps/${config.luisAppId}?verbose=true&timezoneOffset=0&subscription-key=${config.luisKey}&q=${message}`;
    const response = await getUrl(request);

    if(response) {
      return this.getIntention(response);
    } else {
      return message;
    }
  }

  getIntention(response) {
    const {
      query, 
      topScoringIntent: {
        intent, score
      }, entities
    } = response;

    let msg = query;
    if(intent && score > 0.9) {
      msg = intent;
      entities.forEach(entity => {
        msg += ' ' + entity.entity;
      });
    }
    return msg;
  }
}

module.exports = LuisParser;