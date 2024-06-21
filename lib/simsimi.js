const axios = require('axios');

async function simSimi(text, language = 'id') {
    try {
        const data = new URLSearchParams();
        data.append('text', text);
        data.append('lc', language);
        data.append('=', '');

        const config = {
            method: 'post',
            url: 'https://simsimi.vn/web/simtalk',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Accept': 'application/json, text/javascript, */*; q=0.01',
                'X-Requested-With': 'XMLHttpRequest'
            },
            data: data
        };

        const response = await axios(config);
        return response.data;
    } catch (e) {
        return { error: e.message };
    }
}

module.exports = { simSimi };