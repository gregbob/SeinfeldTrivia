const io = require('socket.io')(3000);
const sockets = require('./sockets');
const logger = require('./utils/logger').extend('app');

io.on('connection', (socket) => {
  sockets.listen({socket, io});
});

logger('server started');