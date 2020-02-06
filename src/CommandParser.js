class CommandParser {
  parser(message) {
    if(typeof message != 'string') return { command: "" , params: [] }; 

    const arg = message.split(" ");
    const command = arg[0] || "";
    const params = arg.slice(1);
    
    return { command, params };
  }
}

module.exports = CommandParser;
