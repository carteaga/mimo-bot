class CommandParser {
  parser(message) {
    const arg = message.split(" ");
    const command = arg[0] || "";
    const params = arg.slice(1);
    
    return { command, params };
  }
}

module.exports = CommandParser;
