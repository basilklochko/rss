var parser = require('parse-rss');

exports.parse = function (url, callback) {
    parse(url, callback);
};

function parse(url, callback) {
    parser(url, function (err, rss) {
        if (callback != undefined && callback != null) {
            callback(rss);
        }
    });
}