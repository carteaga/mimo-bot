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
  timezone: process.env.TIME_ZONE,
};

const configBot = {
  throwErrorOnTosBlock: true,
  autoRefresh: true,
  qrRefreshS: 15,
  killTimer: 40,
  blockCrashLogs: true,
  cacheEnabled: false,
};

const happyThursday = {
  users: process.env.HAPPY_THURSDAY_USERS?.split(',') || [],
  timezone: process.env.TIME_ZONE,
  schedule: process.env.HAPPY_THURSDAY_SCHEDULE,
  gif: process.env.HAPPY_THURSDAY_GIF,
};

const callDotas = {
  users: process.env.CALL_DOTAS_USERS?.split(',') || [],
  timezone: process.env.TIME_ZONE,
  schedule: process.env.CALL_DOTAS_SCHEDULE,
  gif: process.env.CALL_DOTAS_GIF,
};

module.exports = {
  config,
  configBot,
  happyThursday,
  callDotas,
};
