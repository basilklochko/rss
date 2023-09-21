var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var Server = mongodb.Server;
var Db = mongodb.Db;
var db;

var mongoUrl = 'mongodb://carsteam:detroit2006@ds133964.mlab.com:33964/rss_reader';

exports.getCollection = function (collectionName) {
    return getCollection(collectionName);
};

exports.insertDocuments = function (docs, collectionName, callback) {
    insertDocuments(docs, collectionName, callback);
};

exports.clearCollection = function (collectionName) {
    clearCollection(collectionName);
};

exports.searchCollectionWithQuery = function (query, collection) {
    return searchCollectionWithQuery(query, collection);
};

exports.searchCollection = function (searchField, searchValue, collection) {
    return searchCollection(searchField, searchValue, collection);
};

exports.updateDocument = function (doc, collectionName, callback) {
    updateDocument(doc, collectionName, callback);
};

exports.deleteById = function (id, collectionName, callback) {
    deleteById(id, collectionName, callback);
};

exports.deleteMany = function (searchCriterias, collectionName, callback) {
    deleteMany(searchCriterias, collectionName, callback);
};

exports.findById = function (id, collectionName, callback) {
    findById(id, collectionName, callback);
};

function deleteById(id, collectionName, callback) {
    var _id = mongodb.ObjectId(id);

    mongoClient.connect(mongoUrl, function (err, db) {
        var collection = db.collection(collectionName);

        collection.deleteOne({ '_id': _id }, {
            w: 1
        }, function (err, result) {
            if (err) {
                console.log(err);
            }

            if (callback != undefined) {
                callback(result);
            }
        });
    });
}

function deleteMany(searchCriterias, collectionName, callback) {
    mongoClient.connect(mongoUrl, function (err, db) {
        var collection = db.collection(collectionName);

        collection.deleteMany(searchCriterias, {
            w: 1
        }, function (err, result) {
            if (err) {
                console.log(err);
            }

            if (callback != undefined) {
                callback(result);
            }
        });
    });
}

function findById(id, collectionName, callback) {
    var _id = mongodb.ObjectId(id);

    mongoClient.connect(mongoUrl, function (err, db) {
        var collection = db.collection(collectionName);

        collection.findOne({ '_id': _id }, {
            w: 0
        }, function (err, result) {
            if (err) {
                console.log(err);
            }

            if (callback != undefined) {
                callback(result);
            }
        });
    });
}

function updateDocument(doc, collectionName, callback) {
    doc._id = mongodb.ObjectId(doc._id);

    mongoClient.connect(mongoUrl, function (err, db) {
        var collection = db.collection(collectionName);

        collection.update({ '_id': doc._id }, doc
            , function (err, result) {
                if (err) {
                    console.log(err);
                }

                if (callback != undefined) {
                    callback(doc);
                }
            });
    });
}

function getCollection(collectionName) {
    var collection = null;
    open();

    db.collection(collectionName, function (err, collection) {
        return collection;
        close();
    });
}

function insertDocuments(docs, collectionName, callback) {
    mongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.log(err);
        }

        var collection = db.collection(collectionName);

        collection.insert(docs, {
            w: 1
        }, function (err, result) {
            if (err) {
                console.log(err);
            }

            if (callback != undefined) {
                callback(result);
            }
        });
    });
}

function clearCollection(collectionName) {
    mongoClient.connect(mongoUrl, function (err, db) {
        if (err) {
            console.dir(err);
        }

        db.collection(collectionName).remove();
    });
}

function searchCollectionWithQuery(query, collectionName) {
    var promise = new Promise(
        function (resolve, reject) {
            mongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    console.log(err);
                }

                db.collection(collectionName).find(query).toArray(function (err, documents) {
                    if (err) {
                        console.log(err);
                    }

                    resolve(documents);
                });
            });
        }
    );

    promise.then(
        function (val) {
            return val;
        });

    return promise;
}

function searchCollection(searchCriterias, collectionName) {
    var promise = new Promise(
        function (resolve, reject) {
            mongoClient.connect(mongoUrl, function (err, db) {
                if (err) {
                    console.log(err);
                }

                var query = {};

                if (searchCriterias != null) {
                    searchCriterias.forEach(function (item, index) {
                        if (item.field == '_id') {
                            item.value = mongodb.ObjectId(item.value);
                        }

                        query[item.field] = item.value;
                    });
                }

                db.collection(collectionName).find(query).toArray(function (err, documents) {
                    if (err) {
                        console.log(err);
                    }

                    resolve(documents);
                });
            });
        }
    );

    promise.then(
        function (val) {
            return val;
        });

    return promise;
}

function open() {
    var server = new Server(mongoUrl, {
        auto_reconnect: true
    });
    db = new Db('rss', server);

    db.open(function (err, dbref) {
        if (err) {
            console.log(err);
        }
    });
}

function close() {
    db.close();
}