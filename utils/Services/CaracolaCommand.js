class CaracolaCommand {
  constructor() {
    this._command = "!caracola";
    this._respuestas = [
       'Maybe Someday'
      ,'Nada' // (dice esto cuando se le preguntó qué hacer)
      ,'Ni' // (dice esto cuando se le preguntó un "¿cuál?" Pregunta)
      ,'Yo no lo creo'
      ,'No'
      ,'Sí'
      ,'Prueba a preguntar otra vez'
    ];
  }

  get command() {
    return this._command;
  }

  async execute({ command, params, context, client }) {
    const {
      sender: { pushname }
    } = context;

    const pregunta = params.join(" ");
    let respuesta = "eso no es una pregunta";
    
    if(pregunta != '') {
      if(pregunta.toUpperCase() == 'QUE HACER?') {
        respuesta = `La respuesta a eso es: ${this._respuestas[1]}`;
      } else if (pregunta.toUpperCase() == 'CUAL?') {
        respuesta = `La respuesta a eso es: ${this._respuestas[2]}`;
      } else {
        const random = Math.floor(Math.random() * this._respuestas.length);
        respuesta = `🐚 ${pushname} la respuesta a eso es: ${this._respuestas[random]} 🐚`;
      }

    }
    await client.sendText(context.from, respuesta);
  }
}

module.exports = CaracolaCommand;

