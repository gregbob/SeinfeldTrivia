const User = require('./user'); 
const Room = require('./room'); 
const makeid = require('../utils/makeid');
const logger = require('../utils/logger').extend('roomService');

const rooms = {}

const createRoom = async (ownerId) => {
  const room = new Room(makeid(4), ownerId);
  logger('Creating new room: %O', room);
  rooms[room.roomCode] = room;
  logger('Current rooms: %O', rooms);

  return room;
}

const validateRoomExists = (roomCode) => {
  const roomExists = roomCode in rooms;
  logger(`Room: ${roomCode} exists`);
  return roomExists;
}

const joinRoom = function (roomCode, userInfo, id) {
  const user = new User(userInfo.name, id);
  rooms[roomCode].addUser(user);
  logger('Adding new user: %O to \nroom:%O', user, rooms[roomCode]);
}

const startGame = function(roomCode) {
  rooms[roomCode].enterQuestionState();
  return rooms[roomCode];
}

const submitAnswer = function(roomCode, userId, answer) {
  const room = rooms[roomCode];
  logger('Submitting answer: %s for user: %s in room: %s', answer, userId, roomCode);
  room.submitAnswer(userId, answer);
  return room;
}

module.exports = {
  createRoom,
  validateRoomExists,
  joinRoom,
  startGame,
  submitAnswer
}