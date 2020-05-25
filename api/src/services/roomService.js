const User = require('./user'); 
const makeid = require('../utils/makeid');
const logger = require('../utils/logger').extend('roomService');
const rooms = {}

class Room {
  constructor(roomCode, ownerId) {
    this.roomCode = roomCode;
    this.ownerId = ownerId;
    this.gameState = 'SETUP';
    this.users = [];
  }

  addUser(user) {
    this.users.push(user);
  }

  enterQuestionState() {
    this.gameState = 'QUESTION';
    // Reset user answers
    this.users.forEach(user => {
      user.resetAnswer();
    })
  }
}

const createRoom = async (ownerId) => {
  const room = new Room(makeid(4), ownerId);
  logger('Creating new room: %O', room);
  rooms[room.roomCode] = room;
  logger('Current rooms: %O', rooms);

  return room;
}

const validateRoomExists = (roomCode) => {
  return roomCode in rooms;
}

const joinRoom = function (roomCode, name, id) {
  const user = new User(name, id);
  rooms[roomCode].addUser(user);
  logger('Adding new user: %O to \nroom:%O', user, rooms[roomCode]);
}

const startGame = function(roomCode) {
  rooms[roomCode].enterQuestionState();
  return rooms[roomCode];
}

const getRoomByOwnerId = function (ownerId) {
  return ownerMap[ownerId];
}

module.exports = {
  createRoom,
  validateRoomExists,
  joinRoom,
  getRoomByOwnerId,
  startGame
}