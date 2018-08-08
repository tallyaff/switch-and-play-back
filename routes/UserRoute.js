const UserService = require('../services/UserService')

module.exports = (app) => {
    app.post('/user/login', (req, res) => {
        const credentials = req.body
        // console.log('req^1^:', credentials);        
        UserService.checkLogin(credentials )
        .then(user => {
            // console.log('req^7^', user);
            req.session.loggedinUser = user;
            delete user.password;
            res.json(user)
        })
            .catch(err => {
                // console.log('errrrrrrrrrrrrrrrrr');
                res.json(err)
                res.status(401).send('Wrong user/pass ' + err)
            })
                
    });

    app.post(`/user/signup`, (req, res) => {
        const user = req.body;
        UserService.addUser(user)
            .then(addedUser =>{
                req.session.loggedinUser = addedUser;
                res.json(addedUser) 
            })
            .catch(err => {
                console.log(err)
                res.status(500).send('Could not add USER')
            })
    })


    app.post(`/user/logout`, (req, res) => {
        req.session.loggedinUser = null;
        res.end('Loggedout!');
    });

    // app.get('/user', (req, res) => {
    //     UserService.query()
    //         .then(users => res.json(users))
    // })

        
    app.get('/user/:userId', (req, res) => {
        const userId = req.params.userId;
        // console.log('router before promise:', userId);
        UserService.getById(userId)
            .then(user => {
                console.log('user in router in back:', user);
                res.json(user)
            })
    })
    
    app.put('/user/:userId', (req, res)=>{
        const user = req.body;
        UserService.updateUser(user)
            .then(user => res.json(user))
    })

}

