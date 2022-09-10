const sulla = require('@open-wa/wa-automate');
const debug = require('debug')('app:server');
const { configBot, config } = require('./src/config/index');
const startBot = require('./src/startBot');

sulla
  .create({
    ...configBot,
    restartOnCrash: startBot,
  })
  .then((client) => startBot(client))
  .catch((e) => console.log('error', e));
