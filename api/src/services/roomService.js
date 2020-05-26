const User = require('./user'); 
const Room = require('./room'); 
const makeid = require('../utils/makeid');
const logger = require('../utils/logger').extend('roomService');

// Map host id to room
const hostMap = {}
// Map room id to rooms
const rooms = {}
// Map user id to rooms/users
const userMap = {}

const createRoom = async (hostId) => {
  const room = new Room(makeid(4), hostId);
  logger('Creating new room: %O', room);
  rooms[room.roomCode] = room;
  logger('Current rooms: %O', rooms);
  hostMap[hostId] = room;
  logger('Updating host map: %O', hostMap);

  return room;
}

const validateRoomExists = (roomCode) => {
  const roomExists = roomCode in rooms;
  logger(`Room: ${roomCode} exists`);
  return roomExists;
}

const addUser = function (roomCode, userInfo, id) {
  const user = new User(userInfo.name, id);
  const room = rooms[roomCode];

  rooms[roomCode].addUser(user);
  logger('Adding new user: %O to \nroom:%O', user, rooms[roomCode]);

  userMap[id] = {
    user,
    room
  };
  logger('Adding user to userMap: %O', userMap);
}

const startGame = function(hostId, onRoundTimeoutCallback) {
  const room = hostMap[hostId];
  room.enterQuestionState(onRoundTimeoutCallback);
  logger('Starting game: %O', room);
  return room;
}

const enterJudgementState = function(hostId) {
  const room = hostMap[hostId];
  room.enterJudgementState();
  return room;
}

const submitAnswer = function(userId, answer) {
  const user = userMap[userId].user;
  user.currentAnswer = answer;

  const room = userMap[userId].room;
  logger('Submitting answer: %s for user: %s in room: %s', answer, user, room);

  if (room.allAnswersHaveBeenSubmitted()) {
    room.enterJudgementState();
  }

  return room;
}

const answersJudged = function(hostId, users) {
  const room = hostMap[hostId];
  room.exitJudgementState(users);
  room.enterResultState();
  return room;
}

module.exports = {
  createRoom,
  validateRoomExists,
  addUser,
  startGame,
  enterJudgementState,
  submitAnswer,
  answersJudged
}