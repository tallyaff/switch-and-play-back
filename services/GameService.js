const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService') 

function queryGames() {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('game');
            return collection.find({}).toArray()
        })
}

function remove(gameId) {
    gameId = new ObjectId(gameId)
    // console.log('game deleted#####', gameId);
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('game');
            // console.log('gameId', gameId)
            return collection.remove({ _id: gameId })
        })
}

function update(game) {
    game._id = new ObjectId(game._id)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('game');
            return collection.updateOne({ _id: game._id }, { $set: game })
                .then(result => {
                    return game;
                })
        })
}

function add(game) {
    return MongoService.connect()
    .then(db => {
        const collection = db.collection('game');
            return collection.insertOne(game)
            .then(result => {
                game._id = result.insertedId;
                return game;
            })
        })
}

function getById(gameId) {
    gameId = new ObjectId(gameId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('game');
            return collection.findOne({ _id: gameId })
        })
}

module.exports = {
    queryGames,
    remove,
    getById,
    add,
    update
}



