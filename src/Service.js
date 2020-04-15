class Service {
  constructor() {
    this._command = "";
  }
  
  match(command) {
    return this._command == command;
  }
}

module.exports = Service;