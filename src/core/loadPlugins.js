const debug = require('debug')('app:server');
const getFilesInFolder = require('../utils/getFilesInFolder');

const loadPlugins = ({ client }) => {
  const allPluginsFile = getFilesInFolder('plugins');

  try {
    allPluginsFile.forEach(({ file, name }) => {
      const plugin = require(`../plugins/${file}`);
      plugin({ client });
      debug(`se ha cargado el plugin ${name}`);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = loadPlugins;
