const { Buffer } = require('buffer');
const Service = require('../Service');
const { getUrl } = require('../utils/getUrl');

class PokemonCommand extends Service {
  constructor() {
    super();
    this.command = '!poke';
    this.help = 'Invoca a tu pokémon favorito. !poke [#id pokémon] o !poke [nombre pokémon]';
  }

  async getImagePokemon(url) {
    const img = await getUrl(url, { responseType: 'arraybuffer' });
    if (img) {
      return `data:image/png;base64,${Buffer.from(img, 'binary').toString(
        'base64'
      )}`;
    }
    return undefined;
  }

  formatResponsePokemon(data) {
    const { weight, types, height, name, abilities, id } = data;
    const abilitiesPokemon = abilities
      .map((info) => info.ability.name)
      .join(', ');
    const typesPokemon = types.map((info) => info.type.name).join(', ');

    return [
      `#${id} *${name}* | Tipo(s): ${typesPokemon}`,
      `Pesa: ${weight / 10}kg | Mide: ${height / 10}m`,
      `Habilidades: ${abilitiesPokemon}`,
    ].join('\n');
  }

  async execute({ params, context, client }) {
    const { from } = context;
    let idPokemon = params[0] || '';
    idPokemon = Number.isNaN(params[0])
      ? idPokemon.toLowerCase()
      : parseInt(idPokemon, 10);
    const request = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    const response = await getUrl(request);

    if (!idPokemon && response) {
      const { count } = response;
      await client.sendText(from, `Hay ${count} pokémon`);
    } else if (response) {
      const {
        sprites: { front_default: frontDefault },
      } = response;

      const img = await this.getImagePokemon(frontDefault);
      const textFormated = this.formatResponsePokemon(response);

      if (img !== '') {
        await client.sendImage(from, img, 'img.png', textFormated);
      } else {
        await client.sendText(from, textFormated);
      }
    } else {
      await client.sendText(
        from,
        `Lo siento, el pokémon ${idPokemon} no fue encontrado 😧`
      );
    }
  }
}

module.exports = PokemonCommand;
