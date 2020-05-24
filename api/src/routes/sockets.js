const { roomController } = require('../controllers');

module.exports.listen = function(socket) {
  console.log('a user connected');

  socket.on('create-room', (data) => {
    roomController.createRoom(data, socket);
  });
}