

module.exports = io => {
    io.on('connection', socket => {
        var userId = null;
        console.log('user connected');

        socket.on('loggedIn', id => {
            userId = id;
        })

        socket.on('loggedOut', () => {
            userId = null;
        })
      
        socket.on('newMatch', () => {
          console.log('got newMatch event')
          io.emit('newMatch');
        })
        
        socket.on('disconnect', () => {
          console.log('user disconnected');
        })
      })
}
