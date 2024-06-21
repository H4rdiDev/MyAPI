const axios = require('axios');

async function dalle(prompt) {
  try {
    const response = await axios.get(`https://anabot.my.id/api/ai/dalle3?prompt=${encodeURIComponent(prompt)}&apikey=kntllkuda`, {
      responseType: 'arraybuffer'
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching DALL-E 3 image:', error.message);
    throw error;
  }
}

module.exports = { dalle };