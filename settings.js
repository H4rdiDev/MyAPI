// YTTA

//settings
global.creator = 'H4rdiDev'
global.listkey = ["h4rdi"]

//isi agar fitur fitur bisa di gunakan.
global.lolkey = 'ISI_PUNYA_LOLHUMAN' // Dapatkan di https://api.lolhuman.xyz
global.botkey = 'Admin' // Dapatkan di https://api.botcahx.biz.id

global.loghandler = {
    error: {
        status: false,
        code: 503,
        creator: creator,
        message: 'Service Unavailable: Currently undergoing maintenance. Please try again later.'
    },
    notapikey: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: API key is required. Please provide a valid API key.'
    },
    noturl: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: URL parameter is missing. Please include the URL parameter.'
    },
    notquery: {
        status: false,
        code: 404,
        creator: creator,
        message: 'Not Found: Query parameter "query" is missing. Please include the query parameter.'
    },
    notprompt: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Prompt parameter is missing. Please include the required prompt parameter.'
    },
    notemail: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Email parameter is missing. Please provide the required email parameter.'
    },
    notpassword: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Password parameter is missing. Please provide the required pass parameter.'
    },
    notid: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: ID parameter is missing. Please provide the required id parameter.'
    },
    notcode: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Code parameter is missing. Please provide the required code parameter.'
    },
    notnumber: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Number parameter is missing. Please provide the required number parameter.'
    },
    notamount: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Amount parameter is missing. Please provide the required amount parameter.'
    },
    notusername: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Username parameter is missing. Please provide the required username parameter.'
    },
    notserver: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Server parameter is missing. Please provide the required server parameter.'
    },
    nottext: {
        status: false,
        code: 404,
        creator: creator,
        message: 'Not Found: Text parameter is missing. Please include the required text parameter.'
    },
    nottext1: {
        status: false,
        code: 404,
        creator: creator,
        message: 'Not Found: Text1 parameter is missing. Please include the required text1 parameter.'
    },
    nottext2: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Text2 parameter is missing. Please include the required text2 parameter.'
    },
    nottext3: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Text3 parameter is missing. Please include the required text3 parameter.'
    },
    notanguage: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Language parameter is missing. Please include the required language parameter.'
    },
    notfilter: {
        status: false,
        code: 403,
        creator: creator,
        message: 'Forbidden: Filter parameter is missing. Please include the required filter parameter.'
    }
};