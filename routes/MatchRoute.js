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
        console.log('req.body', req.body);
        // console.log('req.game', req.body.match.gameId);
        let matchId = req.body.match.matchId
        console.log('matchId??', matchId);
        // console.log('req.body.match.textareaRes in routes', req.body.match.textareaRes);
        MatchService.getById(matchId)
        .then(match => {
            console.log('match after MatchService.getById(matchId)', match)
            res.json(match)
            MatchService.updateMatch(match, req.body.match.gameId)
            // MatchService.updateMatch(match, req.body.match.gameId, req.body.match.textareaRes)
            .then(match => {
                res.json(match)
            })
        })
    })

    // app.put('/match/:matchId', (req, res) => {
    //     console.log('PUT: /match/:matchId req.body', req.body);
    //     // console.log('req.game', req.body.match.gameId);
    //     let matchId = req.body.match._id
    //     console.log('matchId in put ??', matchId);
    //     // console.log('req.body.match.textareaRes in routes', req.body.match.textareaRes);
    //     // console.log('req.body.match.textareaRes in routes', req.body.match.textareaRes);
    //     MatchService.getById(matchId)
    //         .then(match => {
    //             console.log('match after MatchService.getById(matchId)', match)
    //             res.json(match)
    //             // MatchService.updateMatch(match, req.body.match.gameId, req.body.match.textareaRes)
    //             MatchService.updateMatch(match, req.body.match.gameId)
    //                 .then(match => {
    //                     res.json(match)
    //                 })
    //         })
    // })

    // app.get('/match/:userId', (req, res) => {
    //     console.log('req.query.userId^^', req.query.userId);
    //     const userId = req.params.userId;
    //     MatchService.queryMatch(userId)
    //     .then(match => res.json(match))
    // })
    
}