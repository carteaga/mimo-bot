const Service = require('../Service');

class CaracolaCommand extends Service {
  constructor() {
    super();
    this.command = '!caracola';
    this.help = 'Preguntale algo a la caracola mágica. ej: !caracola hoy tendré suerte?';
    this.respuestas = [
      'Maybe Someday',
      'Nada', // (dice esto cuando se le preguntó qué hacer)
      'Yo no lo creo',
      'No',
      'Sí',
      'Prueba a preguntar otra vez',
      'Probablemente',
      'Ninguno',
    ];
  }

  async execute({ params, context, client }) {
    const {
      sender: { pushname },
      from,
    } = context;

    const pregunta = params.join(' ');
    let respuesta = 'eso no es una pregunta';

    if (pregunta !== '') {
      if (pregunta.toUpperCase() === 'QUE HACER?') {
        respuesta = `La respuesta a eso es: ${this.respuestas[1]}`;
      } else {
        const random = Math.floor(Math.random() * this.respuestas.length);
        respuesta = `🐚 ${pushname} la respuesta a eso es: ${this.respuestas[random]}`;
      }
    }
    await client.sendText(from, respuesta);
  }
}

module.exports = CaracolaCommand;
