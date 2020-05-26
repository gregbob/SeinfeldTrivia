const logger = require('../utils/logger').extend('room');

module.exports = class Room {
  constructor(roomCode, hostId) {
    this.roomCode = roomCode;
    this.hostId = hostId;
    this.gameState = 'SETUP';
    this.users = [];
    this.roundTime = 15;
    this.roundTimeoutId = '';
  }

  addUser(user) {
    this.users.push(user);
  }

  enterQuestionState(onRoundTimeOutCallback) {
    this.gameState = 'QUESTION';
    // Reset user answers
    this.users.forEach(user => {
      user.resetAnswer();
    })

    this.roundTimeoutId = setTimeout(onRoundTimeOutCallback, this.roundTime * 1000);
  }

  enterResultState() {
    this.gameState = 'RESULT';
    logger(`${this.roomCode} is entering the ${this.gameState} game state`);

    clearTimeout(this.roundTimeoutId);
    delete this.roundTimeoutId;
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

  toPayload() {
    return {
      gameState: this.gameState,
      users: this.users,
      roundTime: this.roundTime
    }
  }

  // submitAnswer(userId, answer) {
  //   const user = this.getUser(userId);
  //   logger('Submitting answer for %O', user);
  //   user.currentAnswer = answer;

  //   if (this.allAnswersHaveBeenSubmitted()) {
  //     this.enterResultState();
  //   }
  // }

  // getUser(userId) {
  //   logger('looking for user: %s', userId);
  //   for(var i = 0; i < this.users.length; i++) {
  //     const user = this.users[i];
  //     if (user.id == userId) {
  //       logger('Found user: %O', user);
  //       return user;
  //     }
  //   }
  // }
}
