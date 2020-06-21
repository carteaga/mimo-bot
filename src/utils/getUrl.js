const axios = require('axios');
const debug = require('debug')('app:server');

async function getUrl(url, config = {}) {
  try {
    const response = await axios.get(url, config);
    const {data} = response;
    return data;
  } catch (error) {
    debug(error);
    return undefined;
  }
}

module.exports = {
  getUrl
};
