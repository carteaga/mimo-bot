const REGEX_COMMAND = /^!\s*([a-zA-ZÀ-ÿ\u00f1\u00d1]+)\s*(.*)$/;

const EMPTY_COMMAND = { command: '', params: [] };

class CommandParser {
  cleanText(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  parser(message) {
    const result = REGEX_COMMAND.exec(message);

    if (!result) return EMPTY_COMMAND;

    const [, commandRaw, args] = result;
    const command = `!${this.cleanText(commandRaw)}`;
    const params = args.length > 0 ? args.split(' ') : [];

    return { command, params };
  }
}

module.exports = CommandParser;
