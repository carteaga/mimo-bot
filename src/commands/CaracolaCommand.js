const Service = require('../core/Service');

class CaracolaCommand extends Service {
  constructor() {
    super();
    this.command = '!caracola';
    this.help =
      'Preguntale algo a la caracola mágica. ej: !caracola hoy tendré suerte?';
    this.answers = [
      'En mi opinión, sí',
      'Es cierto',
      'Es decididamente así',
      'Probablemente',
      'Buen pronóstico',
      'Todo apunta a que sí',
      'Sin duda',
      'Sí',
      'Sí - definitivamente',
      'Debes confiar en ello',
      'Respuesta vaga, vuelve a intentarlo',
      'Pregunta en otro momento',
      'Será mejor que no te lo diga ahora',
      'No puedo predecirlo ahora',
      'Concéntrate y vuelve a preguntar',
      'Puede ser',
      'No cuentes con ello',
      'Mi respuesta es no',
      'Mis fuentes me dicen que no',
      'Las perspectivas no son buenas',
      'Muy dudoso',
    ];
  }

  async execute({ context, client }) {
    const { from, id } = context;

    const message =
      this.answers[Math.floor(Math.random() * this.answers.length)];

    await client.reply(from, message, id);
  }
}

module.exports = CaracolaCommand;
