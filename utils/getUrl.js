const axios = require("axios");

async function getUrl(url) {
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
    console.log(data);
  } catch (error) {
    console.log(error);

  }
}

module.exports = {
  getUrl
}