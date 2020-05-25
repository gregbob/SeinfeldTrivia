const logger = require('../utils/logger').extend('room');

module.exports = class Room {
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

  enterResultState() {
    this.gameState = 'ANSWER';
  }

  allAnswersHaveBeenSubmitted() {
    for(var i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (!user.currentAnswer) {
        return false;
      }
    }
    return true;
  }

  submitAnswer(userId, answer) {
    const user = this.getUser(userId);
    logger('Submitting answer for %O', user);
    user.currentAnswer = answer;

    if (this.allAnswersHaveBeenSubmitted()) {
      this.enterResultState();
    }
  }

  getUser(userId) {
    logger('looking for user: %s', userId);
    for(var i = 0; i < this.users.length; i++) {
      const user = this.users[i];
      if (user.id == userId) {
        logger('Found user: %O', user);
        return user;
      }
    }
  }
}
