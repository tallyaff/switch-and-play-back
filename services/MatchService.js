const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService') 

function queryMatch(userId) {
    var criteria = {};
    if (userId) criteria.$or = [
        {'userActive.userId': userId},
        {'userPasive.userId': userId}
    ]
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('match');
            return collection.find(criteria).toArray()
            .then(res => {
                console.log('in querymatch got:', res)
                return res
            })
        })
}

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

