const Service = require("../Service");
const { decryptMedia } = require("@open-wa/wa-automate");
const mime = require("mime-types");
const fs = require("fs");
const uaOverride =
  "WhatsApp/2.16.352 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Safari/605.1.15";

class ImageToSticker extends Service {
  constructor() {
    super();
    this._command = "!sticker";
    this._types = ["image"];
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      mimetype,
      from
    } = context;
    const mediaData = await decryptMedia(context, uaOverride);
    await client.sendImageAsSticker(
      `data:${mimetype};base64,${mediaData.toString("base64")}`,
      from
    );
  }
}

module.exports = ImageToSticker;
