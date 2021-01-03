const phrases = require('../utils/phrases');
const Service = require('../Service');

class RandomContact extends Service {
  constructor() {
    super();
    this.command = '!elige';
    this.help = 'Selecciona un miembro del grupo al azar.';
  }

  async execute({ context, client }) {
    const { from, isGroupMsg, chatId } = context;

    if (!isGroupMsg) {
      client.sendText(from, 'pssss estamos solos los dos.');
    }

    const members = await client.getGroupMembers(chatId);
    const membersWithoutMe = members.filter((member) => !member.isMe);
    const memberElected =
      membersWithoutMe[Math.floor(Math.random() * membersWithoutMe.length)];
    const phoneNumber = memberElected.id.split('@')[0] || 'error';

    await client.sendTextWithMentions(from, `El elegido es: @${phoneNumber}`);
  }
}

module.exports = RandomContact;
