# Mimo-Bot

Es un bot para whatsapp que responde a través de comandos como por ejemplo !hello. El bot se ejecuta a través de whatsapp web para leer y responder los comandos, esto con ayuda de [wa-automate-nodejs](https://github.com/open-wa/wa-automate-nodejs).

## Pre-requisitos

- Tener instalado [nodejs](https://nodejs.org/es/) 

- Un celular con un número disponible para whatsapp,  esto es porque que el bot iniciará sesión con whatsapp-web para leer mensajes. Durante el tiempo que el bot se encuentre activo, el movil debe disponer con una conexión a internet. Puedes utilizar tu celular para hacer una prueba, después solo basta con quitar el permiso de acceso a whatsapp web para detener el bot.

## Instalación

1. Clonar el repositorio
2. Ejecutar comando npm install para descargar dependencias
3. Ejecutar comando npm run dev o npm start
4. Escanear código QR con el celular que ocupara el bot
5. Escribir !hello a través de whatsapp al número que inicio whatsapp

## Ejemplos de comandos implementados

!horoscopo sagitario: Entrega el horóscopo de sagitario

!hello saluda al número entrante

## Variables de entorno (opcional)

Bot cuenta con funcionalidad adicional, para activar esto, se deben configurar las siguientes variables de entorno.

### Ping

El bot envia el mensaje "estoy vivo" a un número determinado cada cierto X tiempo configurado en el variable TIME_PING.

- PHONE_PING: Número de telefono que recive el ping, el formato debe ser **[Código de país][número de telefono]@c** ejemplo: '56988888888@c.us'
- TIME_PING: Intervalo de tiempo en milisegundos para enviar el mensaje.

### Otros 
- YOUTUBE_KEY=Llave para conectarse a la api de youtube, el comando !prosor ocupa este valor.
- PORT: puerto para levantar página web de bot (por defecto 3000)


## Licencia
 
Este programa está licenciado bajo MIT
