const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const api = require('./api');
const websocket = require('./websocket');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, '../dist')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
app.disable('etag');

const server = http.createServer(app);

websocket.init(server);

server.listen(port, () => console.log(`Running on localhost:${port}`));