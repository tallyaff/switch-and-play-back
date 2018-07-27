const MatchService = require('../services/MatchService')

module.exports = (app) => {
    console.log('match arrived')
    app.post('/match', (req, res) => {

        const match = req.body;
        console.log('match in rout service',match )
        MatchService.addMatch(match)
            .then(match => {
                res.json(match)
            })
    })

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