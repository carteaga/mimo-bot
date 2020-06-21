class CommandOrchestrator {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  execute(config) {
    const matches = this.commands.filter((cmd) => cmd.match(config));
    return Promise.all(matches.map((cmd) => cmd.execute(config)));
  }
}

module.exports = CommandOrchestrator;
