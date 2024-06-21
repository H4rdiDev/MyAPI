const axios = require('axios');

async function pixiv(text) {
  try {
    const response = await axios.get(`https://anabot.my.id/api/search/pixiv?query=${text}&apikey=kntllkuda`, {
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching Pixiv image:', error.message);
    throw error;
  }
}

module.exports = { pixiv };