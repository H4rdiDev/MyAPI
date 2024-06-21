let axios = require('axios');
let BodyForm = require('form-data');
let fs = require('fs');
let fetch = require('node-fetch');
let cheerio = require('cheerio');

async function importFileType() {
    const { fromBuffer } = await import('file-type');
    return { fromBuffer };
}

function TelegraPh(Path) {
    return new Promise(async (resolve, reject) => {
        console.log(`Checking if file exists at path: ${Path}`); // Debugging path

        if (!fs.existsSync(Path)) {
            console.error(`File not found at path: ${Path}`); // Log error with path
            return reject(new Error("File not Found"));
        }

        try {
            const form = new BodyForm();
            form.append("file", fs.createReadStream(Path));
            const data = await axios({
                url: "https://telegra.ph/upload",
                method: "POST",
                headers: {
                    ...form.getHeaders()
                },
                data: form
            });
            resolve("https://telegra.ph" + data.data[0].src);
        } catch (err) {
            reject(new Error(String(err)));
        }
    });
}

module.exports = { TelegraPh };