const Service = require("../Service");
const { getUrl } = require("../../utils/getUrl");
const { Buffer } = require("buffer");

class PokemonCommand extends Service {
  constructor() {
    super();
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
    const { weight, types, height, name, abilities, id } = data;
    const abilitiesPokemon = abilities
      .map((info) => info.ability.name)
      .join(", ");
    const typesPokemon = types.map((info) => info.type.name).join(", ");
    
    return [
      `#${id} *${name}* | Tipo(s): ${typesPokemon}`,
      `Pesa: ${weight / 10}kg | Mide: ${height / 10}m`,
      `Habilidades: ${abilitiesPokemon}`,
    ].join("\n");
  }

  async execute({ command, params, context, client }) {
    const { from } = context;
    let idPokemon = params[0] || "";
    idPokemon = isNaN(params[0])
      ? idPokemon.toLowerCase()
      : parseInt(idPokemon, 10);
    const request = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    const response = await getUrl(request);

    if (!idPokemon && response) {
      const { count } = response;
      await client.sendText(from, `Hay ${count} pokémon`);
    } else if (response) {
      const {
        sprites: { front_default },
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
