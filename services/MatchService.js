const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService') 

function queryMatch(userId) {
    var criteria = {};
    if (userId) criteria.$or = [
        {'userActive.userId': userId},
        {'userPassive.userId': userId}
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
                console.log('in querymatch got:', res)
                return res
            })
        })
}


// function queryMatch(userId) {
//     var criteria = {};
//     if (userId) criteria.$or = [
//         {'userActive.userId': userId},
//         {'userpassive.userId': userId}
//     ]
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('match');
//             return collection.find(criteria).toArray()
//             .then(res => {
//                 console.log('in querymatch got:', res)
//                 return res
//             })
//         })
// }

// function getById(matchId) {
//     matchId = new ObjectId(matchId)
//     return MongoService.connect()
//         .then(db => {
//             const collection = db.collection('match');
//             return collection.find({ _id: matchId })
//         })
// }

module.exports = {
    queryMatch,
    // getById
}

