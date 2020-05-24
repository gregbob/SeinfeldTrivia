const { roomService } = require('../services');

const createRoom = async (socket) => {
  try {
    const response = await roomService.createRoom();
    socket.join(response.roomCode);

    return response;
  } catch(e) {
    console.log(e.message)
  }
}

const joinRoom = async (data, socket) => {
  try {
    // Validate room exists
    if (!roomService.validateRoomExists()) {
      return false;
    }
    // Add user to room
    console.log(`Joining room ${data.roomCode}`);
    socket.join(data.roomCode);

    // Broadcast that user joined this room
    socket.to(data.roomCode).emit('roomJoined', data)

    return true;

  } catch (e) {
    console.log(e.message);
  }
}

module.exports = {
  createRoom,
  joinRoom
}