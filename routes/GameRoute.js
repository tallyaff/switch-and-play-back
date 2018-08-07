const GameService = require('../services/GameService')
const UserService = require('../services/UserService')

module.exports = (app) => {
    // app.get('/game', (req, res) => {
    //     GameService.query()
    //     .then(games => res.json(games))
    // })

    app.get('/game', (req, res) => {
        GameService.queryGames(req.query.allByName, req.query.name, req.query.type, req.query.category, req.query.userId)
            .then(games => res.json(games))
    })
    
    app.get('/game/:gameId', (req, res) => {
        const gameId = req.params.gameId;
        
        GameService.getById(gameId)
        .then(game => {
            // console.log('game??', game);
            res.json(game)
        })
    })
    
    //for user details in each game
    app.get('/games/:userId', (req, res) => {
        const userId = req.params.userId;
        // console.log('router before promise:', userId);
        UserService.getById(userId)
            .then(user => {
                // console.log('user in router in back:', user);
                res.json(user)
            })
    })

    app.delete('/game/:gameId', (req, res)=>{
        const gameId = req.params.gameId;
        // console.log('game deleted****', gameId);
        GameService.remove(gameId)
        .then((result)=>{
            // console.log('result', result)
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