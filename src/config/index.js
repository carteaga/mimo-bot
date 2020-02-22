require('dotenv').config();

const config = {
  dev:  process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  phonePing: process.env.PHONE_PING
}

module.exports = {
  config
}