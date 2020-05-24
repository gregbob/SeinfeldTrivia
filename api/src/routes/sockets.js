const { roomController } = require('../controllers');

module.exports.listen = function(socket) {
  console.log('a user connected');

  socket.on('createRoom', async (callback) => {
    const response = await roomController.createRoom(socket);
    callback(response);
  });

  socket.on('joinRoom', async (data, callback) => {
    const response = await roomController.joinRoom(data, socket);
    callback(response);
  });
}