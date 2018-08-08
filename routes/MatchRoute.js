const MatchService = require('../services/MatchService')
const GameService = require('../services/GameService')

module.exports = (app) => {
    // console.log('match arrived')
    app.post('/match', (req, res) => {

        const match = req.body;
        // console.log('match in route service', match )
        MatchService.addMatch(match)
            .then(match => {
                res.json(match)
            })
    })
    
    app.get('/match/user/:userId', (req, res) => {
        console.log('req.params.userId@@', req.params.userId);
        MatchService.queryMatch(req.params.userId)
        .then(matches => res.json(matches))
    })

    app.get('/match/:matchId', (req, res) => {
        console.log('/game/:gameId/match/:matchId, req.params:::', req.params);
        MatchService.getById(req.params.matchId)
        .then(match => res.json(match))
    })

    app.put('/match/:matchId', (req, res) => {
        console.log('req.body.match', req.body.match);
        let matchId = req.body.match._id 
        console.log('matchId??', req.body.match._id);
        MatchService.getById(matchId)
        .then(match => {
            console.log('match after MatchService.getById(matchId)', match)
            res.json(match)
            MatchService.updateMatch(match, req.body.match.gameId, req.body.match.chat)
            .then(match => {
                console.log('match!!!!!!!!!!!!' , match);
                
                res.end(match)
                // res.end(JSON.stringify(match))
            })
        })
    })

    // app.get('/match/:userId', (req, res) => {
    //     console.log('req.query.userId^^', req.query.userId);
    //     const userId = req.params.userId;
    //     MatchService.queryMatch(userId)
    //     .then(match => res.json(match))
    // })
    
}