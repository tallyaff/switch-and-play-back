var dbConn = null;
const ObjectId = require('mongodb').ObjectId;
const MongoService = require('./MongoService') 


function checkLogin(creds ) {
    console.log('user^2^: ', creds.user.username );     
    // console.log('users^3^: ', users);
    return MongoService.connect()
        .then(db => db.collection('user').findOne({username:creds.user.username, password:creds.user.password}
            // user => user.username === creds.user.username
            // && user.password === creds.password
            // {username:creds.user.username})
        )
    )
}

module.exports = {
    checkLogin,
}




