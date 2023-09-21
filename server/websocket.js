const mongodb = require('./mongodb');
const rss = require('./rss');
const WebSocket = require('ws');
const WebSocketServer = WebSocket.Server;

var wss = null;

exports.init = function (server) {
    init(server);
};

function init(server) {
    wss = new WebSocketServer({ server: server });

    wss.on('connection', function connection(ws) {
        ws.on('message', function incoming(mess) {
            var data = JSON.parse(mess);

            switch (data.operation) {
                case 'start':
                    start(data.id, data.interval, ws);
                    break;
            }
        });
    });
}

function start(id, interval, ws) {
    function refresh(wss, feed, ws) {
        try {
            rss.parse(feed.url, function (rss) {
                wss.clients.forEach(function each(client) {
                    if (client == ws && client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(rss));

                        setTimeout(function () {
                            refresh(wss, feed, ws);
                        }, interval);
                    }
                });
            });
        } catch (e) {
            console.error(e.message);
        }
    }

    mongodb.findById(id, 'feeds', function (feed) {
        if (feed != null) {
            refresh(wss, feed, ws);
        }
    });
}
