class Service {
  constructor() {
    this.command = '';
    this.types = ['chat'];
  }

  matchCommand(command) {
    if (Array.isArray(this.command)) {
      return this.command.indexOf(command) > -1;
    }

    return this.command.toUpperCase() === command.toUpperCase();
  }

  matchType(type) {
    return this.types.indexOf(type) > -1;
  }

  match({ command, type }) {
    return this.matchCommand(command) && this.matchType(type);
  }
}

module.exports = Service;
