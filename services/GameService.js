const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService') 

function queryGames(allByName, name, typeStr, categorystr, userId) {
    // console.log('allByName', allByName, 'name', name, 'typeStr', typeStr, 'categorystr', categorystr, 'userId', userId);
    var criteria = {};
    if (name) criteria.name = {$regex : `.*${name}.*`};
    if (typeStr) {
        var types = typeStr.split(',');
        // console.log('types', types);
        criteria.type = { $in: types };     //if I want all items= change in to all
    }
    if (categorystr) {
        var categories = categorystr.split(',');
        // console.log('categories', categories);
        criteria.category = { $in: categories };
    };
    if (userId) criteria.userId = userId;

    // console.log('Criteria', criteria);
    return MongoService.connect()
            .then(db => {
                const collection = db.collection('game');
                return collection.find(criteria).toArray()
            })
}
// function queryGames() {
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('game');
//             return collection.find(criteria).toArray()
//         })
// }

// var criteria = {};
// if (name) criteria.name = {$regex : `.*${name}.*`};
// if (userId) criteria.userId = userId;
// var types;
// var categories;

// if (!allByName) {
//     if (typeStr) {
//         types = typeStr.split(',');
//         console.log('types', types);
//         criteria.type = { $in: types } ;
//     }
//     if (categorystr) {
//         categories = categorystr.split(',');
//         console.log('categories', categories);
//         criteria.category = { $in: categories } ;
//     }
// }

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



