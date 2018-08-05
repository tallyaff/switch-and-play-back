var dbConn = null;

function connectToMongo() {
    // Reuse existing connection if exist
    if (dbConn) return Promise.resolve(dbConn);
    const MongoClient = require('mongodb').MongoClient;
    const url = 'mongodb://girlsPower:coding1@ds247121.mlab.com:47121/switch-and-play';
    // const url = (!process.env.PORT)? 
    //         'mongodb://girlsPower:coding1@ds247121.mlab.com:47121/switch-and-play': 'mlab url';
    return MongoClient.connect(url)
        .then(client => {
            // console.log('Connected to MongoDB');
            client.on('close', ()=>{
                // console.log('MongoDB Diconnected!');
                dbConn = null;
            })
            dbConn = client.db()
            return dbConn;
        })
}

module.exports = {
    connect : connectToMongo
}
