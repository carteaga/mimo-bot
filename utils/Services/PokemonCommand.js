const { getUrl } = require("../getUrl");
const { Buffer } = require("buffer");

class PokemonCommand {
  constructor() {
    this._command = "!poke";
  }

  get command() {
    return this._command;
  }

  async getImagePokemon(url) {
    const img = await getUrl(url, { responseType: "arraybuffer" });
    if (img) {
      return `data:image/png;base64,${Buffer.from(img, "binary").toString(
        "base64"
      )}`;
    } else {
      return undefined;
    }
  }

  formatResponsePokemon(data) {
    const { weight, types, height, name, abilities } = data;
    const abilitiesPokemon = abilities.map(info => info.ability.name).join("|");
    const typesPokemon = types.map(info => info.type.name).join("|");
    const response = `🤓 ${name} el pokémon tipo [${typesPokemon}] pesa ${weight /
      10}kg, mide ${height / 10}m y posee ${abilities.length} habilidade(s): [${abilitiesPokemon}]`;
    return response;
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    const idPokemon = params[0] || '';
    const request = `https://pokeapi.co/api/v2/pokemon/${idPokemon.toLowerCase()}`;
    const response = await getUrl(request);

    if(idPokemon == '' && response) {
      const { count } = response;
      await client.sendText(from, `Hay ${count} pokémon`);
    } else if (response) {
      const {
        sprites: { front_default }
      } = response;

      const img = await this.getImagePokemon(front_default);
      const textFormated = this.formatResponsePokemon(response);

      img
        ? await client.sendImage(from, img, "img.png", textFormated)
        : await client.sendText(from, textFormated);
    } else {
      await client.sendText(
        from,
        `Lo siento, el pokémon ${idPokemon} no fue encontrado 😧`
      );
    }
  }
}

module.exports = PokemonCommand;
