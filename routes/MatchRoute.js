const MatchService = require('../services/MatchService')


module.exports = (app) => {
    app.get('/match', (req, res) => {
        MatchService.queryMatch(req.query.userId)
        .then(matches => res.json(matches))
    })
    
    app.get('/match/:userId', (req, res) => {
        const userId = req.params.userId;
        MatchService.queryMatch(userId)
        .then(match => res.json(match))
    })
    
}