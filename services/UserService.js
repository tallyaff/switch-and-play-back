var dbConn = null;
const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService')


function checkLogin(creds) {
    console.log('creds:', creds);
    
    // return MongoService.connect()
    //     .then(db => db.collection('user').findOne
    //         ({ 
    //             username: creds.user.username, 
    //             password: creds.user.password 
    //         })
    //     )
    // }
    return MongoService.connect()
        .then(db => db.collection('user').findOne ({
            username: creds.user.username,
            password: creds.user.password
        })
        .then(user => {
            if (user) {
                console.log('yes!!! login'); 
                return Promise.resolve(user)
            } else {
                console.log('no login');                
                return Promise.reject(user);  
            }   
        }) 
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




