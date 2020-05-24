const { roomService } = require('../services');

const createRoom = async (data, socket) => {
  try {
    const response = await roomService.createRoom();

    console.log(`Joining room ${response.roomCode}`);
    socket.join(response.roomCode);

    socket.emit('roomCreated', response);
    
  } catch(e) {
    console.log(e.message)
  }
}

module.exports = {
  createRoom
}