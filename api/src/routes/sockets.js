const { roomController } = require('../controllers');
const logger = require('../utils/logger').extend('sockets');

module.exports.listen = function(context) {
  logger(`${context.socket.id} connected`);

  context.socket.on('createRoom', async (callback) => {
    logger(`createRoom triggered`);
    const response = await roomController.createRoom(context);
    callback(response);
  });

  context.socket.on('addUser', async (data, callback) => {
    logger('addUser called with %O', data);
    const response = await roomController.addUser(data, context);
    callback(response);
  });

  context.socket.on('startGame', async(data) => {
    logger('startGame called with %O', data);
    await roomController.startGame(data, context);
  });

  context.socket.on('submitAnswer', async(data, callback) => {
    logger('submitAnswer called with %O', data);
    callback(await roomController.submitAnswer(data, context));
  });

  context.socket.on('disconnect', async () => {
    logger(`${context.socket.id} disconnected`);
  })
}