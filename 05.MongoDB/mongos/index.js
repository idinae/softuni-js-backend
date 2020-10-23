const mongodb = require('mongodb');

module.exports = {
    connect(connectionString, options) {
        const client = new mongodb.MongoClient(connectionString);
        return client.connect()
    }
}