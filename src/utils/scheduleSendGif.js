const cron = require('node-cron');

const sendMessagesAllGroups = ({ client, users, gif }) =>
  Promise.all(users.map((from) => client.sendGiphyAsSticker(from, gif)));

const scheduleSendGif = ({ users, schedule, timezone, gif, client }) => {
  if (users.length === 0) return;

  if (!cron.validate(schedule)) return;

  if (!schedule) return;

  if (!gif) return;

  cron.schedule(schedule, () => sendMessagesAllGroups({ client, users, gif }), {
    timezone,
  });
};

module.exports = scheduleSendGif;
