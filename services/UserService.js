var dbConn = null;
const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService')


function checkLogin(creds) {
    // console.log('user^2^: ', creds.user.username );     
    // console.log('users^3^: ', users);
    return MongoService.connect()
        .then(db => db.collection('user').findOne({ username: creds.user.username, password: creds.user.password }
            // user => user.username === creds.user.username
            // && user.password === creds.password
            // {username:creds.user.username})
        )
        )
}

function addUser(newUser) {
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.insertOne(newUser)
                .then(result => {
                    newUser._id = result.insertedId;
                    return newUser;
                })
        })

}

function updateUser(user) {
    user._id = new ObjectId(user._id)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.updateOne({ _id: user._id }, { $set: user })
                .then(result => {
                    return user;
                })
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return MongoService.connect()
        .then(db => {
            const collection = db.collection('user');
            return collection.findOne({ _id: userId })
        })
}

module.exports = {
    checkLogin,
    addUser,
    updateUser,
    getById

}




