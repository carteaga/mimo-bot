const CommandOrquester = require("./CommandOrquester");

// services
const HelloCommand = require("./services/HelloCommand");
const RollCommand = require("./services/RollCommand");
const CaracolaCommand = require("./services/CaracolaCommand");
const PokemonCommand = require("./services/PokemonCommand");
const ChuckPhrasesCommand = require("./services/ChuckPhrasesCommand");
const HoroscopoCommand = require("./services/HoroscopoCommand");
const WikipediaCommand = require("./services/WikipediaCommand");
const IsAliveCommand = require("./services/IsAliveCommand");
const TransantiagoCommand = require("./services/TransantiagoCommand");

const commandOrquester = new CommandOrquester();
commandOrquester.addCommand(new HelloCommand());
commandOrquester.addCommand(new RollCommand());
commandOrquester.addCommand(new CaracolaCommand());
commandOrquester.addCommand(new ChuckPhrasesCommand());
commandOrquester.addCommand(new PokemonCommand());
commandOrquester.addCommand(new HoroscopoCommand());
commandOrquester.addCommand(new WikipediaCommand());
commandOrquester.addCommand(new IsAliveCommand());
commandOrquester.addCommand(new TransantiagoCommand());
module.exports = commandOrquester;