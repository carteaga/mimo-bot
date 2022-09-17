const { Buffer } = require('buffer');
const Service = require('../core/Service');
const { getUrl } = require('../utils/getUrl');

class PokemonCommand extends Service {
  constructor() {
    super();
    this.command = '!poke';
    this.help =
      'Invoca a tu pokémon favorito. !poke [#id pokémon] o !poke [nombre pokémon]';
  }

  async getImagePokemon(url) {
    if (!url) return null;

    const img = await getUrl(url, { responseType: 'arraybuffer' });
    if (img) {
      return `data:image/png;base64,${Buffer.from(img, 'binary').toString(
        'base64'
      )}`;
    }
    return null;
  }

  formatResponsePokemon(data) {
    const {
      weight = 0,
      types = [],
      height = 0,
      name,
      abilities = [],
      id,
    } = data;

    const abilitiesPokemon = abilities
      .map((info) => info.ability.name)
      .join(', ');
    const typesPokemon = types.map((info) => info.type.name).join(', ');

    return [
      `#${id} *${name}* | Tipo(s): ${typesPokemon}`,
      `Pesa: ${weight / 10}kg | Mide: ${height / 10}m`,
      `Habilidades: ${abilitiesPokemon || 'no registrado.'}`,
    ].join('\n');
  }

  async execute({ params, context, client }) {
    const { from } = context;
    let idPokemon = params[0] || '';
    idPokemon = Number(params[0])
      ? parseInt(idPokemon, 10)
      : idPokemon.toLowerCase();

    if (!idPokemon != '') {
      client.sendText(from, 'porfavor dime qué pokémon elegir.');
      return;
    }

    const request = `https://pokeapi.co/api/v2/pokemon/${idPokemon}`;
    const response = await getUrl(request);

    if (!response) {
      await client.sendText(
        from,
        `Lo siento, el pokémon ${idPokemon} no fue encontrado 😧`
      );
      return;
    }

    const {
      sprites: { front_default: frontDefault },
    } = response;

    const img = await this.getImagePokemon(frontDefault);
    const textFormated = this.formatResponsePokemon(response);

    img
      ? await client.sendImage(from, img, 'img.png', textFormated)
      : await client.sendText(from, textFormated);
  }
}

module.exports = PokemonCommand;
