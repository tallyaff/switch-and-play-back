const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const addUserRoutes = require('./routes/UserRoute')
const addGameRoutes = require('./routes/GameRoute')
const app = express()

app.use(cors({
  origin: ['http://localhost:8080'],
  credentials: true // enable set cookie
}));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'girls power',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(express.static('dist'));

app.get('/', (req, res) => res.send('switch-and-toy'))

app.post('/singup', (req, res) => {
    const username = req.body.username
    UserService.addUser({ username })
      .then(user => res.json(user))
  })
  

app.put('/login', (req, res) => {
  const username = req.body.username
  UserService.checkLogin({ username })
    .then(user => {
      req.session.user = user
      res.json(user)
    })
})

addUserRoutes(app)
addGameRoutes(app)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});

// app.listen(3000, () => console.log('Example app listening on port 3000  !'))