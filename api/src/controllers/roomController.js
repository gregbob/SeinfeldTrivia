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

const joinRoom = async (data, context) => {
  try {
    // Validate room exists
    if (!roomService.validateRoomExists(data.roomCode)) {
      logger('Failed to join room');
      return false;
    }
    // Add user to room
    roomService.joinRoom(data.roomCode, data.user, context.socket.id);
    context.socket.join(data.roomCode);

    // Broadcast that user joined this room
    context.socket.to(data.roomCode).emit('roomJoined', data.user)

    return true;

  } catch (e) {
    logger(e.message);
  }
}

const startGame = async (data, context) => {
  try {
    const response = roomService.startGame(data.roomCode);
    context.io.in(response.roomCode).emit('updateGameState', response.gameState);
  } catch (e) {
    logger(e.message);
  }
}

module.exports = {
  createRoom,
  joinRoom,
  startGame
}