require('dotenv').config();

const config = {
  dev:  process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  phonePing: process.env.PHONE_PING,
  timePing: process.env.TIME_PING || 3600000,
  luisKey: process.env.LUIS_KEY,
  luisEndPoint: process.env.LUIS_ENDPOINT,
  luisAppId: process.env.LUIS_APP_ID,
  youtubeKey: process.env.YOUTUBE_KEY
}

module.exports = {
  config
}