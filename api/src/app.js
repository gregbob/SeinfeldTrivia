const io = require('socket.io')(3000);
const sockets = require('./routes/sockets');

io.on('connection', (socket) => {
  sockets.listen({socket, io});
});