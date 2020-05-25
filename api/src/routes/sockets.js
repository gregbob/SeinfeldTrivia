const { roomController } = require('../controllers');

module.exports.listen = function(context) {
  console.log(`${context.socket.id} connected`);

  context.socket.on('createRoom', async (callback) => {
    const response = await roomController.createRoom(context);
    callback(response);
  });

  context.socket.on('joinRoom', async (data, callback) => {
    const response = await roomController.joinRoom(data, context);
    callback(response);
  });

  context.socket.on('startGame', async(data) => {
    await roomController.startGame(data, context);
  });

  context.socket.on('disconnect', async () => {
    console.log(`${context.socket.id} disconnected`);
  })
}