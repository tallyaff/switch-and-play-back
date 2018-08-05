const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http);

const addUserRoutes = require('./routes/UserRoute')
const addGameRoutes = require('./routes/GameRoute')
const addMatchRoutes = require('./routes/MatchRoute')

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
addMatchRoutes(app)

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`App listening on port ${port}!`)
});


io.on('connection', socket => {
  console.log('user connected')

  socket.on('newMatch', () => {
    io.emit('newMatch');
  })
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})
// app.listen(3000, () => console.log('Example app listening on port 3000  !'))