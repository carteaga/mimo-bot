const sulla = require('@open-wa/wa-automate');
const debug = require('debug')('app:server');
const express = require('express');
const { configBot, config } = require('./src/config/index');
const startBot = require('./src/startBot');

const app = express();

sulla
  .create('session', {
    ...configBot,
    restartOnCrash: startBot,
  })
  .then(async (client) => {
    await startBot(client);
  })
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.log('error', e);
  });

app.get('/', async (req, res) => {
  return res.sendFile('./index.html', { root: __dirname });
});

app.listen(config.port, () => {
  debug(`Example app listening on port ${config.port}!`);
});
