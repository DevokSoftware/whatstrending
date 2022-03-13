const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(cors({ origin: "https://whatstrendingtoday.herokuapp.com", credentials: true }))

app.use("/api/*", createProxyMiddleware(
    {
        "target": "https://whatstrendingtoday-api.herokuapp.com",
        "secure": false,
        "logLevel": "debug",
        "changeOrigin": true
    }))


app.use(express.static(__dirname + '/dist/frontend'));
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname +
        '/dist/frontend/index.html'));
});
app.listen(process.env.PORT || 8080);