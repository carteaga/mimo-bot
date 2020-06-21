class Service {
  constructor() {
    this.command = '';
    this.types = ['chat'];
  }

  match({ command, type }) {
    return this.command === command && this.types.indexOf(type) > -1;
  }
}

module.exports = Service;
