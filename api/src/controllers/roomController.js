const { roomService } = require('../services');
const logger = require('../utils/logger').extend('roomController');
/**
 * Responsible for handling socket orchestration
 */

const createRoom = async (context) => {
  try {
    const response = await roomService.createRoom(context.socket.id, (room) => {
      _emitUpdateGameState(context, room);
    });

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
    const room = roomService.addUser(data.roomCode, data.user, context.socket.id);
    context.socket.join(room.roomCode);

    _emitUpdateGameState(context, room);
    return true;

  } catch (e) {
    logger(e.message);
    return false;
  }
}

const startGame = async (context) => {
  try {
    roomService.startGame(context.socket.id);
  } catch (e) {
    logger(e.message);
  }
}

const submitAnswer = async (data, context) => {
  try {
    roomService.submitAnswer(context.socket.id, data.answer);
    return true;
  } catch (e) {
    logger(e.message);
    return false;
  }
}

const answersJudged = async (data, context) => {
  roomService.answersJudged(context.socket.id, data);
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
  submitAnswer,
  answersJudged
}