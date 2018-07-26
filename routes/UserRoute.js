const UserService = require('../services/UserService')

module.exports = (app) => {
    app.post('/user/login', (req, res) => {
        const credentials = req.body
        console.log('req^1^:', credentials);        
        UserService.checkLogin(credentials )
        .then(user => {
            console.log('req^7^', user);
            delete user.password;
            res.json(user)
        })
            .catch(err => res.status(401).send('Wrong user/pass ' + err))
    });

    app.post(`/signup`, (req, res) => {
        const user = req.body;
        UserService.addUser(user)
            .then(addedUser => res.json(addedUser))
            .catch(err => {
                console.log(err)
                res.status(500).send('Could not add USER')
            })
    })

    app.get('/user', (req, res) => {
        UserService.query()
        .then(users => res.json(users))
    })
    
}

