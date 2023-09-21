var request = require('request');
const express = require('express');
const router = express.Router();
const mongodb = require('./mongodb');
const rss = require('./rss');

router.post('/remind', (req, res) => {
    var email = req.body;

    var searchCriterias = [{
        field: 'email',
        value: email.to
    }];

    mongodb.searchCollection(searchCriterias, 'users').then(function (data) {
        if (data.length == 0) {
            res.send({ feeds: null, error: 'No users have been found.' });
        }
        else {
            email.body += data[0].password;

            request({
                url: 'http://smtpproxy.gearhostpreview.com/api/home/send',
                // url: 'http://localhost:55327/api/home/send',
                method: 'POST',
                headers: { 'application': 'RSS Reader' },
                json: email, function(err, res, body) {
                }
            });

            res.send({ result: true, error: '' });
        }
    });
});

router.post('/getRssStructure', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var feed = req.body;

            rss.parse(feed.url, function (rss) {
                if (rss.length > 0) {
                    res.send({ feedMapper: rss[0], error: '' });
                }
                else {
                    res.send({ feedMapper: null, error: 'No feed was found.' });
                }
            })
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.get('/getRss/:id', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            mongodb.findById(req.params.id, 'feeds', function (feed) {
                if (feed != null) {
                    rss.parse(feed.url, function (rss) {
                        if (rss != null && rss.length > 0) {
                            res.send({ feedMapper: rss, error: '' });
                        }
                        else {
                            res.send({ feedMapper: null, error: 'No feed was found.' });
                        }
                    })
                }
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/updateFeed', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var feed = req.body;

            mongodb.updateDocument(feed, 'feeds', function (result) {
                res.send({ _id: result._id, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/deleteFeed', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var feed = req.body;

            mongodb.deleteById(feed._id, 'feeds', function (result) {
                res.send({ _id: result._id, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/addFeed', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var feed = req.body;

            mongodb.insertDocuments(feed, 'feeds', function (data) {
                res.send({ feed: data, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.get('/getFeeds', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var searchCriterias = [{
                field: 'userId',
                value: req.headers['_id']
            }];

            mongodb.searchCollection(searchCriterias, 'feeds').then(function (data) {
                if (data.length == 0) {
                    res.send({ feeds: null, error: 'No feeds have been created.' });
                }
                else {
                    res.send({ feeds: data, error: '' });
                }
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.get('/getFeedsByCategory/:id?', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {

            var query = {
                userId: req.headers['_id']
            };

            if (req.params.id == undefined) {
                query.categories =
                    {
                        $eq: []
                    };
            }
            else {
                query.categories =
                    {
                        $elemMatch: {
                            $eq: req.params.id
                        }
                    };
            }

            mongodb.searchCollectionWithQuery(query, 'feeds').then(function (data) {
                if (data.length == 0) {
                    res.send({ feeds: null, error: 'No feeds have been created.' });
                }
                else {
                    res.send({ feeds: data, error: '' });
                }
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/deleteCategory', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var category = req.body;

            mongodb.deleteById(category._id, 'categories', function (result) {
                res.send({ _id: result._id, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/updateCategory', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var category = req.body;

            mongodb.updateDocument(category, 'categories', function (result) {
                res.send({ _id: result._id, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/addCategory', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var category = req.body;

            mongodb.insertDocuments(category, 'categories', function (data) {
                res.send({ category: data, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.get('/getCategories', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var searchCriterias = [{
                field: 'userId',
                value: req.headers['_id']
            }];

            mongodb.searchCollection(searchCriterias, 'categories').then(function (data) {
                if (data.length == 0) {
                    res.send({ categories: null, error: 'No categories have been created.' });
                }
                else {
                    res.send({ categories: data, error: '' });
                }
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/changePassword', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var user = req.body;

            mongodb.updateDocument(user, 'users', function (result) {
                res.send({ _id: result._id, error: '' });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

router.post('/createUser', (req, res) => {
    var user = req.body;

    var searchCriterias = [{
        field: 'email',
        value: user.email
    }];

    res.setHeader('Content-Type', 'application/json');

    mongodb.searchCollection(searchCriterias, 'users').then(function (data) {
        if (data.length > 0) {
            res.send({ _id: '', error: 'User with this email already exist.' });
        }
        else {
            mongodb.insertDocuments(user, 'users', function (data) {
                res.send({ _id: data.ops[0]._id, error: '' });
            });
        }
    });
});

router.post('/loginUser', (req, res) => {
    var user = req.body;

    res.setHeader('Content-Type', 'application/json');

    var searchCriterias = [{
        field: 'email',
        value: user.email
    }];

    mongodb.searchCollection(searchCriterias, 'users').then(function (data) {
        if (data.length == 0) {
            res.send({ _id: '', error: 'User with this email was not found.' });
        }
        else {
            if (data[0].password === user.password || data[0].isGoogle) {
                res.send({ _id: data[0]._id, error: '' });
            }
            else {
                res.send({ _id: '', error: 'Password was not recognized.' });
            }
        }
    });
});

router.post('/deleteUser', (req, res) => {
    isAuthorized(req).then(function (isAuth) {
        if (isAuth) {
            var user = req.body;

            var searchCriterias = {
                'userId': user._id
            };

            mongodb.deleteMany(searchCriterias, 'feeds', function (data) {
                console.log(data);
                mongodb.deleteMany(searchCriterias, 'categories', function (data) {
                    mongodb.deleteById(user._id, 'users', () => {
                        res.send({ _id: '', error: '' });
                    });
                });
            });
        }
        else {
            res.send({ _id: '', error: 'Not authorized' });
        }
    });
});

function isAuthorized(req) {
    var promise = new Promise((resolve, reject) => {
        var _id = req.headers['_id'];

        if (_id == null || _id.length == 0) {
            resolve(false);
        }

        mongodb.findById(_id, 'users', function (data) {
            if (data != null) {
                resolve(true);
            }
        });
    });

    return promise;
}

module.exports = router;