const makeid = require('../utils/makeid');

const createRoom = async () => {
  return {
    roomCode: makeid(4)
  }
}

const validateRoomExists = async (roomCode) => {
  return true;
}

module.exports = {
  createRoom,
  validateRoomExists
}