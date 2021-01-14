const REGEX_COMMAND = /^!\s*([a-zA-ZÀ-ÿ\u00f1\u00d1]+)\s*(.*)$/;

class CommandParser {
  cleanText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  parser(message) {
    const result = REGEX_COMMAND.exec(message);

    if (!result) {
      return { command: '', params: [] };
    }

    const [, commandRaw, args] = result;
    const command = `!${this.cleanText(commandRaw)}`;
    const params = args.split(' ');

    return { command, params };
  }
}

module.exports = CommandParser;
