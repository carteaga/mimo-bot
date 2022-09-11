require('dotenv').config();

const config = {
  sessionId: 'session',
  dev: process.env.NODE_ENV !== 'production',
  port: process.env.PORT || 8080,
  phonePing: process.env.PHONE_PING,
  timePing: process.env.TIME_PING || 3600000,
  luisKey: process.env.LUIS_KEY,
  luisEndPoint: process.env.LUIS_ENDPOINT,
  luisAppId: process.env.LUIS_APP_ID,
  youtubeKey: process.env.YOUTUBE_KEY,
  excludeCommands: process.env.EXCLUDE_COMMANDS?.split(',') || [],
};

const configBot = {
  throwErrorOnTosBlock: true,
  headless: config.dev,
  autoRefresh: true,
  qrRefreshS: 15,
  killTimer: 40,
  devtools: config.dev,
  blockCrashLogs: true,
  cacheEnabled: false,
};

module.exports = {
  config,
  configBot,
};
