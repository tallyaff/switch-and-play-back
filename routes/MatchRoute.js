const MatchService = require('../services/MatchService')

module.exports = (app) => {

    app.post('/game', (req, res) => {
        const match = req.body;
        MatchService.addMatch(match)
            .then(match => {
                res.json(match)
            })
    })
}