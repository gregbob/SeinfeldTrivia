const createRoom = async () => {
  return {
    roomCode: 1234
  }
}

const validateRoomExists = async (roomCode) => {
  return true;
}

module.exports = {
  createRoom,
  validateRoomExists
}