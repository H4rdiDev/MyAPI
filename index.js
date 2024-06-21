require('./settings')
const express = require('express'); 
const app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var favicon = require('serve-favicon');
var createError = require('http-errors');
var { color } = require('./lib/color');
cors = require('cors'),
secure = require('ssl-express-www');

const PORT = process.env.PORT || 3003

// Image title
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

var main = require('./routes/main'),
    api = require('./routes/api');

app.set('trust proxy', true);
app.set("json spaces", 2);
app.use(cors());
app.use(secure);
app.use(cookieParser());
app.use(express.static("public"));
app.use('/', main);
app.use('/api', api);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
    res.sendFile(__path + '/view/404.html');
});

app.listen(PORT, '0.0.0.0', () => {
    const ip = require('ip');
    console.log(color(`Server running on IP ${ip.address()} and port ${PORT}`, 'white'));
});

module.exports = app;
