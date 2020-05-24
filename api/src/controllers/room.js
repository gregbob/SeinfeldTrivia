const { roomService } = require('../services');
const { createRoom } = roomService;

const postRoom = async (req, res, next) => {
  try {
    const response = await createRoom();
    res.send(response);
  } catch(e) {
    console.log(e.message)
    res.sendStatus(500) && next(error)
  }
}

module.exports = {
  postRoom
}