const MatchService = require('../services/MatchService')


module.exports = (app) => {
    app.get('/match/:userId', (req, res) => {
        console.log('req.params.userId@@', req.params.userId);
        console.log('req.query.userId@@', req.query.userId);
        MatchService.queryMatch(req.params.userId)
        .then(matches => res.json(matches))
    })
    
    // app.get('/match/:userId', (req, res) => {
    //     console.log('req.query.userId^^', req.query.userId);
    //     const userId = req.params.userId;
    //     MatchService.queryMatch(userId)
    //     .then(match => res.json(match))
    // })
    
}