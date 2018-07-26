const GameService = require('../services/GameService')

module.exports = (app) => {
    // app.get('/game', (req, res) => {
    //     GameService.query()
    //     .then(games => res.json(games))
    // })

    app.get('/game', (req, res) => {

        // console.log('req', req);
        console.log('req.query', req.query);
        
        GameService.query(req.query.allByName, req.query.name, req.query.type, req.query.category, req.query.userId)
            .then(games => res.json(games))
    })
    
    app.get('/game/:gameId', (req, res) => {
        const gameId = req.params.gameId;
        
        GameService.getById(gameId)
        .then(game => res.json(game))
    })
    
    app.delete('/game/:gameId', (req, res)=>{
        const gameId = req.params.gameId;
        console.log('game deleted****', gameId);
        GameService.remove(gameId)
        .then((result)=>{
            console.log('result', result)
            res.end(`Game ${gameId} Deleted `)
        })
        
    })
    
    app.post('/game', (req, res) => {
        const game = req.body;
        GameService.add(game)
        .then(game => {
            res.json(game)
        })
    })
    
    app.put('/game/:gameId', (req, res)=>{
        const game = req.body;
        GameService.update(game)
        .then(game => res.json(game))
    })
    
}