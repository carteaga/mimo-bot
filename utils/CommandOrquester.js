class CommandOrchestrator {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  async execute(config) {
    const { command } = config;
    for (const cmd of this.commands) {
      if (cmd.command.toUpperCase() == command.toUpperCase()) {
        await cmd.execute(config);
      }
    }
  }
}

module.exports = CommandOrchestrator;
