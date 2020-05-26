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

const startGame = async (data, context) => {
  try {
    const room = roomService.startGame(data.roomCode);
    context.io.in(room.roomCode).emit('updateGameState', room);
  } catch (e) {
    logger(e.message);
  }
}

const submitAnswer = async (data, context) => {
  try {
    const room = roomService.submitAnswer(data.roomCode, context.socket.id, data.answer);
    logger('Result of room after submitting answer: %O', room);

    if (room.gameState == 'RESULT') {
      logger('Emitting updateGameState event with payload: %O', room);
      context.io.in(room.roomCode).emit('updateGameState', room);
    }

    return true;
  } catch (e) {
    logger(e.message);
    return false;
  }
}

module.exports = {
  createRoom,
  addUser,
  startGame,
  submitAnswer
}