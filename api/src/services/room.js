const makeid = require('../utils/makeid');

const rooms = {}

class User {
  constructor(name, id) {
    this.id = id;
    this.name = name;
    this.currentAnswer = '';
    this.score = 0;
    // this.icon = icon;
  }

  updateScore(score) {
    this.score += score;
  }

  resetAnswer() {
    this.currentAnswer = '';
  }
}

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
  rooms[room.roomCode] = room;

  return room;
}

const validateRoomExists = (roomCode) => {
  return roomCode in rooms;
}

const joinRoom = function (roomCode, name, id) {
  rooms[roomCode].addUser(new User(name, id));
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