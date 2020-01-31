class CommandOrchestrator {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  execute(config) {
    const { command } = config;
    let data = '';
    this.commands.forEach(cmd => {
      console.log(cmd);
      if(cmd.command == command) {
        data = cmd.execute(config);
      }
    });
    console.log(data);
    return data;
  }
}

module.exports = CommandOrchestrator;