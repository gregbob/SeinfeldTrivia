const makeid = require('../utils/makeid');

const rooms = {}

const createRoom = async (ownerId) => {
  const roomCode = makeid(4);
  rooms[roomCode] = {
    ownerId,
    users: {}
  }
  return {
    roomCode
  }
}

const validateRoomExists = (roomCode) => {
  return roomCode in rooms;
}

const joinRoom = function (roomCode, user, userId) {
  rooms[roomCode].users[userId] = user;
}


module.exports = {
  createRoom,
  validateRoomExists,
  joinRoom
}