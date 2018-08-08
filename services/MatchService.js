const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService')
const GameService = require('./GameService')


function queryMatch(userId) {
    // console.log('user in aggregate', userId);
    var criteria = {};
    if (userId) criteria.$or = [
        { 'userActive.userId': userId },
        { 'userPassive.userId': userId }
    ]
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('match');
            return collection.aggregate([
                {
                    $match: criteria
                },
                {
                    $lookup: {
                        from: 'game',
                        localField: 'userPassive.gameId',
                        foreignField: '_id',
                        as: 'userPassiveGame'
                    }
                },
                {
                    $unwind: '$userPassiveGame'
                },
                {
                    $lookup: {
                        from: 'game',
                        localField: 'userActive.games',
                        foreignField: '_id',
                        as: 'userActiveGames'
                    }
                }
            ]).toArray()
                .then(res => {
                    // console.log('@@@@@@@@@in querymatch got:', res)
                    return res.reverse()
                })
        })
}

function updateMatch(match, game, textareaRes) {
    // console.log('match$$: ', match);
    // console.log('game$$$: ', game);
    // console.log('matchId$$$: ', match._id);
    const matchItem = {
        userActive:
        {
            userId : match.userActive.userId,
            games: [ObjectId(game)],
            textareaReq: match.userActive.textareaReq,
        },
        userPassive:
        {
            userId: match.userPassive.userId,
            gameId: ObjectId(match.userPassive.gameId),
            textareaRes: textareaRes,
        },
        isMatch: true
    }
    updateGameStatus(match.userPassive.gameId);   //update passive game to isAvailble = false
    updateGameStatus(game);                         //update active game to isAvailble = false

    return MongoService.connect()
        .then(db => {
            // console.log('matchhhhhhhh', matchItem);
            
            const collection = db.collection('match');
            return collection.updateOne({ _id: match._id }, { $set: matchItem })
                .then(res => {
                    console.log('from server---match??!!', matchItem);
                    return matchItem;
                })
        })

}

function updateGameStatus(gameId) {
    GameService.getById(gameId)
        .then(game => {
            // console.log('game??', game)
            res.json(game)
            return MongoService.connect()
                .then(db => {
                    const collection = db.collection('game');
                    return collection.updateOne({ _id: gameId }, { $set: { "isAvailble": false } })
                        .then(res => {
                            return game;
                        })
                })
        })
}

function addMatch(newMatch) {
    // console.log('newMatch.userActive.games', newMatch.userActive.games)
    newMatch.userPassive.gameId = ObjectId(newMatch.userPassive.gameId);
    newMatch.userActive.games = newMatch.userActive.games.map(gameId => {
        // console.log('gameid servie oded', gameId)
        return ObjectId(gameId);
    });
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('match');
            return collection.insertOne(newMatch)
                .then(result => {
                    newMatch._id = result.insertedId;
                    return newMatch;
                })
        })
}



function getById(matchId) {
    var matchIdObj = new ObjectId(matchId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('match');
            return collection.findOne({ _id: matchIdObj })
        })
}

module.exports = {
    queryMatch,
    updateMatch,
    getById,
    addMatch
}

