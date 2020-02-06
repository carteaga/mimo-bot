class ImgurCommand {
  constructor() {
    this._command = "!imgur";
  }

  get command() {
    return this._command;
  }

  

  async execute({ command, params, context, client }) {

  }
}

module.exports = ImgurCommand;
