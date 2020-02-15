const axios = require("axios");

async function getUrl(url, config = {}) {
  try {
    const response = await axios.get(url, config);
    const data = response.data;
    return data;
  } catch (error) {
    return undefined;
  }
}

module.exports = {
  getUrl
};
