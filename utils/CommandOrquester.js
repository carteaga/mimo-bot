class CommandOrchestrator {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  async execute(config) {
    const { command } = config;
    let data = '';
    for(const cmd of this.commands) {
      if(cmd.command.toUpperCase() == command.toUpperCase()) {
        await cmd.execute(config);
        console.log('obtuvo esta data', data);
      }
    }
    console.log(data);
    //return data;
  }
}

module.exports = CommandOrchestrator;