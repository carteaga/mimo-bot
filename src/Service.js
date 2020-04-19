class Service {
  constructor() {
    this._command = "";
    this._types = ["chat"];
  }

  match(command, type, params) {
    return this._command == command && this._types.indexOf(type) > -1;
  }
}

module.exports = Service;
