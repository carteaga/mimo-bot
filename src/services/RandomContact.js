const phrases = require('../utils/phrases');
const Service = require('../Service');

const MESSAGE_TWO_CONTACT = 'pssss ya sabes quién será el elegido';

class RandomContact extends Service {
  constructor() {
    super();
    this.command = '!elige';
    this.help = 'Selecciona un miembro del grupo al azar.';
  }

  async execute({ context, client }) {
    const { from, isGroupMsg, chatId } = context;

    if (!isGroupMsg) {
      await client.sendText(from, MESSAGE_TWO_CONTACT);
      return;
    }

    const members = await client.getGroupMembers(chatId);

    if (members.length === 2) {
      await client.sendText(from, MESSAGE_TWO_CONTACT);
      return;
    }

    const membersWithoutMe = members.filter((member) => !member.isMe);
    const memberElected =
      membersWithoutMe[Math.floor(Math.random() * membersWithoutMe.length)];
    const phoneNumber = memberElected.id.split('@')[0] || 'error';

    await client.sendTextWithMentions(from, `El elegido es: @${phoneNumber}`);
  }
}

module.exports = RandomContact;
