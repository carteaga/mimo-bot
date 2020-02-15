const CommandOrquester = require("./CommandOrquester");

// services
const HelloCommand = require("./Services/HelloCommand");
const RollCommand = require("./Services/RollCommand");
const CaracolaCommand = require("./Services/CaracolaCommand");
const PokemonCommand = require("./Services/PokemonCommand");
const ChuckPhrasesCommand = require("./Services/ChuckPhrasesCommand");
const HoroscopoCommand = require("./Services/HoroscopoCommand");
const WikipediaCommand = require("./Services/WikipediaCommand");

const commandOrquester = new CommandOrquester();
commandOrquester.addCommand(new HelloCommand());
commandOrquester.addCommand(new RollCommand());
commandOrquester.addCommand(new CaracolaCommand());
commandOrquester.addCommand(new ChuckPhrasesCommand());
commandOrquester.addCommand(new PokemonCommand());
commandOrquester.addCommand(new HoroscopoCommand());
commandOrquester.addCommand(new WikipediaCommand());
module.exports = commandOrquester;