require('dotenv').config();

const config = {
  dev:  process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  phonePing: process.env.PHONE_PING,
  timePing: process.env.TIME_PING || 3600000
}

module.exports = {
  config
}