class CommandOrchestrator {
  constructor() {
    this.commands = [];
  }

  addCommand(...commands) {
    this.commands.push(...commands);
  }

  execute(config) {
    const matches = this.commands.filter((cmd) => cmd.match(config));

    return Promise.all(
      matches.map((cmd) =>
        cmd.execute({
          ...config,
          commands: this.commands,
        })
      )
    );
  }
}

module.exports = CommandOrchestrator;
