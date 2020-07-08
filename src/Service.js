class Service {
  constructor() {
    this.command = '';
    this.types = ['chat'];
  }

  match({ command, type }) {
    return (
      this.command.toUpperCase() === command.toUpperCase() &&
      this.types.indexOf(type) > -1
    );
  }
}

module.exports = Service;
