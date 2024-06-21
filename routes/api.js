require('../settings')
const express = require('express')
var isUrl = require("is-url")
var fetch = require('node-fetch')
const fs = require('fs');
const util = require('util')
const path = require('path')
const isImageURL = require('image-url-validator').default
const leptonAi = require('../lib/leptonai')
const { aoyo } = require('../lib/aoyo')
const { TelegraPh } = require('../lib/uploader')
const { thinkany } = require('../lib/thinkany')
const { letmegpt } = require('../lib/letmegpt')
const { logo } = require('../lib/logo')
const { simSimi } = require('../lib/simsimi')
const { dalle } = require('../lib/dalle')
const { pixiv } = require('../lib/pixiv')
const { fetchJson, runtime, getBuffer } = require('../lib/functions')
const { set } = require('lodash')
var router = express.Router()



//—————「 AI 」—————//
router.get('/ai/gpt3', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://api.neoxr.eu/api/gpt-pro?q=${query}&apikey=H4rdiDev`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data.message
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/gpt4', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://aemt.me/gpt4?text=${query}`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.result
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/aoyo', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const result = await aoyo(query);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: result
            });
        } catch (error) {
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
})

router.get('/ai/letmegpt', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const result = await letmegpt(query);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: result
            });
        } catch (error) {
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/leptonai', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const result = await leptonAi(query);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: result
            });
        } catch (error) {
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/thinkany', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const result = await thinkany(query);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: result
            });
        } catch (error) {
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/simsimi', async (req, res, next) => {
    const query = req.query.query;
    const language = req.query.language;
    const apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!language) return res.json(loghandler.notlanguage);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const result = await simSimi(query, language);

            if (result.error) {
                throw new Error(result.error);
            }

            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: result
            });

        } catch (error) {
            console.error('Error during simSimi interaction:', error.message);
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/llama', async (req, res, next) => {
  const query = req.query.query;
  const prompt = req.query.prompt;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery);
  if (!prompt) return res.json(loghandler.notprompt);
  if (!apikey) return res.json(loghandler.notapikey);

  if (listkey.includes(apikey)) {
    try {
      let llma = await fetchJson(`https://rammpntxxx-llma.hf.space/generate?text=${query}&prompt=${prompt}`)

      res.json({
        status: true,
        creator: creator,
        result: llma.content
      });
    } catch (error) {
      console.error('Error during llama interaction:', error.message);
      res.json({ status: false, error: error.message });
    }
  } else {
    res.json(loghandler.notapikey);
  }
});

router.get('/ai/dalle', async (req, res, next) => {
  const prompt = req.query.prompt;
  const apikey = req.query.apikey;

  if (!prompt) return res.json(loghandler.notprompt);
  if (!apikey) return res.json(loghandler.notapikey);

  if (listkey.includes(apikey)) {
    try {
      const imageData = await dalle(prompt);

      const tempImagePath = path.join(__dirname, '../tmp/dalle3_image.jpg');
      fs.writeFileSync(tempImagePath, imageData);

      res.sendFile(tempImagePath, {}, (err) => {
        if (err) {
          console.error('Error sending file:', err.message);
          res.status(500).send('Internal Server Error');
        } else {
          fs.unlinkSync(tempImagePath); // Hapus gambar sementara setelah dikirim
        }
      });
    } catch (error) {
      console.error('Error during DALL-E 3 interaction:', error.message);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.json(loghandler.notapikey);
  }
});

router.get('/ai/query2anime', async (req, res, next) => {
    const prompt = req.query.prompt;
    const apikey = req.query.apikey;

    if (!prompt) return res.json(loghandler.notprompt);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const anime = await fetch(`https://api.elxyz.me/ai/querytoanime?apikey=KC-df2284199a80349c&prompt=${prompt}`);
            const result = await anime.json();
            
            if (!result.result.imageUrl) {
                throw new Error('resultUrl not found in the response');
            }

            // Fetch the image from resultUrl
            const imageResponse = await fetch(result.result.imageUrl);

            if (!imageResponse.ok) {
                throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
            }

            // Set the appropriate content type for the image
            const contentType = imageResponse.headers.get('content-type');
            res.setHeader('Content-Type', contentType);

            // Stream the image as the response
            imageResponse.body.pipe(res);

        } catch (error) {
            console.error('Error during fetching or processing:', error.message);
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ai/bingimg', async (req, res, next) => {
  const prompt = req.query.prompt;
  const apikey = req.query.apikey;

  if (!prompt) return res.json(loghandler.notprompt);
  if (!apikey) return res.json(loghandler.notapikey);

  if (listkey.includes(apikey)) {
    try {
      const apiUrl = `https://anabot.my.id/api/ai/bingAi?prompt=${encodeURIComponent(prompt)}&apikey=kntllkuda`;

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // Mendapatkan array URL gambar dari respons JSON
      const images = data.image;

      res.json({
        status: true,
        creator: creator,
        result: images // Mengirimkan array URL gambar sebagai respons
      });
    } catch (error) {
      console.error('Error fetching images from API:', error.message);
      res.status(500).json({ status: false, error: 'Internal Server Error' });
    }
  } else {
    res.json(loghandler.notapikey);
  }
});

//—————「 PPOB 」—————//
router.get('/ppob/cek-trx', async (req, res, next) => {
    var code = req.query.code;
    var id = req.query.id;
    var apikey = req.query.apikey;

    if (!code) return res.json(loghandler.notcode)
    if (!id) return res.json(loghandler.notid);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://api.neoxr.eu/api/topup-check?id=${id}&code=${code}&apikey=H4rdiDev`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ppob/dana', async (req, res, next) => {
    var number = req.query.number;
    var amount = req.query.amount;
    var apikey = req.query.apikey;

    if (!number) return res.json(loghandler.notnumber)
    if (!amount) return res.json(loghandler.notamount);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://api.neoxr.eu/api/topup-dana?number=${number}&amount=${amount}&apikey=H4rdiDev`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/ppob/ovo', async (req, res, next) => {
    var number = req.query.number;
    var amount = req.query.amount;
    var apikey = req.query.apikey;

    if (!number) return res.json(loghandler.notnumber)
    if (!amount) return res.json(loghandler.notamount);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://api.neoxr.eu/api/topup-ovo?number=${number}&amount=${amount}&apikey=H4rdiDev`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data
            })
    } else {
        res.json(loghandler.notapikey);
    }
});
//—————「 SAWERIA 」—————//
router.get('/saweria/login', async (req, res, next) => {
    var email = req.query.email;
    var password  = req.query.password;
    var apikey = req.query.apikey;

    if (!email) return res.json(loghandler.notemail)
    if (!password) return res.json(loghandler.notpassword);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://itzpire.com/saweria/login?email=${email}&password=${password}`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/saweria/create-payment', async (req, res, next) => {
    var email = req.query.email;
    var id = req.query.id;
    var name = req.query.name;
    var amount = req.query.amount;
    var message = req.query.message;
    var apikey = req.query.apikey;

    if (!email) return res.json(loghandler.notemail);
    if (!id) return res.json(loghandler.notid);
    if (!amount) return res.json(loghandler.notamount);
    if (!apikey) return res.json(loghandler.notapikey);

    let namay = name || "H4rdiDev";

    if (listkey.includes(apikey)) {
        try {
            let anu = await fetchJson(`https://itzpire.com/saweria/create-payment?amount=${amount}&name=${namay}&email=${email}&user_id=${id}&msg=${message}`);
            if (anu && anu.data) {
                console.log(`Original QR Image URL: ${anu.data.qr_image}`); // Debugging original QR image URL
                
                // Tentukan path untuk menyimpan file sementara
                const tmpDir = path.join(__dirname, '..', 'tmp');
                const qrImagePath = path.join(tmpDir, `${new Date().getTime()}.png`);
                
                // Pastikan direktori tmp ada
                if (!fs.existsSync(tmpDir)) {
                    fs.mkdirSync(tmpDir, { recursive: true });
                }
                
                // Unduh dan simpan file QR image sementara
                const qrImageResponse = await fetch(anu.data.qr_image);
                const qrImageBuffer = await qrImageResponse.buffer();
                fs.writeFileSync(qrImagePath, qrImageBuffer);

                // Upload file ke Telegra.ph
                let tlgrph = await TelegraPh(qrImagePath);
                anu.data.qr_image = `${util.format(tlgrph)}`;

                if (anu.data.donator.first_name === "Miftah") {
                    anu.data.donator.first_name = "Hardi";
                } else {
                    anu.data.donator.first_name = namay;
                }

                res.json({
                    status: true,
                    code: 200,
                    creator: creator,
                    result: anu.data
                });

                // Hapus file sementara setelah digunakan
                fs.unlinkSync(qrImagePath);
            } else {
                res.json({ error: 'Failed to fetch or process data' });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            res.json({ error: 'Failed to fetch or process data' });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});
//—————「 SEARCH 」—————//
router.get('/search/pinterest', async (req, res, next) => {
    const query = req.query.query;
    const apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (!listkey.includes(apikey)) return res.json(loghandler.invalidapikey);

    try {
        const fetchJson = async (url) => {
            const response = await fetch(url);
            const data = await response.json();
            return data;
        };

        const shuffleArray = (array) => {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        };

        const url = `https://api.neoxr.eu/api/ocr?image=${query}&apikey=H4rdiDev`;
        const anu = await fetchJson(url);

        const pinterestUrl = `https://www.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${query}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${query}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_conquery_on_resource%22%3Afalse%7D%2C%22conquery%22%3A%7B%7D%7D&_=1619980301559`;
        const response = await fetch(pinterestUrl);
        const data = await response.json();

        const results = data.resource_response.data.results.map(v => v.images.orig.url);
        shuffleArray(results);

        res.json({
            status: true,
            creator: creator,
            result: results
        });
    } catch (error) {
        res.status(500).json({ status: false, message: error.message });
    }
});

router.get('/search/pixiv', async (req, res, next) => {
  const query = req.query.query;
  const apikey = req.query.apikey;

  if (!query) return res.json(loghandler.notquery);
  if (!apikey) return res.json(loghandler.notapikey);

  if (listkey.includes(apikey)) {
    try {
      const imageData = await pixiv(query);

      const tempImagePath = path.join(__dirname, '../tmp/pixiv_image.jpg');
      fs.writeFileSync(tempImagePath, imageData);

      res.sendFile(tempImagePath, {}, (err) => {
        if (err) {
          console.error('Error sending file:', err.message);
          res.status(500).send('Internal Server Error');
        } else {
          fs.unlinkSync(tempImagePath); // Hapus gambar sementara setelah dikirim
        }
      });
    } catch (error) {
      console.error('Error during Pixiv interaction:', error.message);
      res.status(500).send('Internal Server Error');
    }
  } else {
    res.json(loghandler.notapikey);
  }
});

router.get('/search/sticker', async (req, res, next) => {
    var query = req.query.query;
    var apikey = req.query.apikey;

    if (!query) return res.json(loghandler.notquery);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://itzpire.com/search/sticker?query=${query}`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data
            })
    } else {
        res.json(loghandler.notapikey);
    }
});
//—————「 TOOLS 」—————//

router.get('/tools/ocr', async (req, res, next) => {
    var url = req.query.url;
    var apikey = req.query.apikey;

    if (!url) return res.json(loghandler.noturl);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        let anu = await fetchJson(`https://api.neoxr.eu/api/ocr?image=${url}&apikey=H4rdiDev`);
            res.json({
                status: true,
                code: 200,
                creator: creator,
                result: anu.data.query
            })
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/tools/upscale', async (req, res, next) => {
    const url = req.query.url;
    const apikey = req.query.apikey;

    if (!url) return res.json(loghandler.noturl);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const upscale = await fetch(`https://www.api.vyturex.com/upscale?imageUrl=${encodeURIComponent(url)}`);
            const result = await upscale.json();
            
            if (!result.resultUrl) {
                throw new Error('resultUrl not found in the response');
            }

            // Fetch the image from resultUrl
            const imageResponse = await fetch(result.resultUrl);

            if (!imageResponse.ok) {
                throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
            }

            // Set the appropriate content type for the image
            const contentType = imageResponse.headers.get('content-type');
            res.setHeader('Content-Type', contentType);

            // Stream the image as the response
            imageResponse.body.pipe(res);

        } catch (error) {
            console.error('Error during fetching or processing:', error.message);
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

router.get('/tools/logo', async (req, res, next) => {
    const prompt = req.query.prompt;
    const apikey = req.query.apikey;

    if (!prompt) return res.json(loghandler.notprompt);
    if (!apikey) return res.json(loghandler.notapikey);

    if (listkey.includes(apikey)) {
        try {
            const logoUrl = await logo(prompt);

            if (logoUrl.error) {
                throw new Error(logoUrl.error);
            }

            const imageResponse = await fetch(logoUrl);

            if (!imageResponse.ok) {
                throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
            }

            const contentType = imageResponse.headers.get('content-type');
            res.setHeader('Content-Type', contentType);
            imageResponse.body.pipe(res);

        } catch (error) {
            console.error('Error during logo generation:', error.message);
            res.json({ status: false, error: error.message });
        }
    } else {
        res.json(loghandler.notapikey);
    }
});

module.exports = router