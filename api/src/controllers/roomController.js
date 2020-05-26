const { roomService } = require('../services');
const logger = require('../utils/logger').extend('roomController');
/**
 * Responsible for handling socket orchestration
 */

const createRoom = async (context) => {
  try {
    const response = await roomService.createRoom(context.socket.id);
    context.socket.join(response.roomCode);
    return response;
  } catch(e) {
    logger(e.message)
  }
}

const addUser = async (data, context) => {
  try {
    // Validate room exists
    if (!roomService.validateRoomExists(data.roomCode)) {
      logger('Failed to join room');
      return false;
    }
    // Add user to room
    roomService.addUser(data.roomCode, data.user, context.socket.id);
    context.socket.join(data.roomCode);

    // Broadcast that user joined this room
    context.socket.to(data.roomCode).emit('roomJoined', data.user)

    return true;

  } catch (e) {
    logger(e.message);
    return false;
  }
}

const startGame = async (context) => {
  try {
    const room = roomService.startGame(context.socket.id, () => {
      logger('Round ended from timeout');
      _emitUpdateGameState(context, roomService.enterResultState(context.socket.id))
    });
    _emitUpdateGameState(context, room);
  } catch (e) {
    logger(e.message);
  }
}

const submitAnswer = async (data, context) => {
  try {
    const room = roomService.submitAnswer(context.socket.id, data.answer);
    logger('Result of room after submitting answer: %O', room);

    if (room.gameState == 'RESULT') {
      _emitUpdateGameState(context, room);
    }

    return true;
  } catch (e) {
    logger(e.message);
    return false;
  }
}

function _emitUpdateGameState(context, room) {
  const updateGameStatePayload = room.toPayload();
  logger('Emitting updateGameState event with payload: %O', updateGameStatePayload);
  context.io.in(room.roomCode).emit('updateGameState', updateGameStatePayload);
}

module.exports = {
  createRoom,
  addUser,
  startGame,
  submitAnswer
}