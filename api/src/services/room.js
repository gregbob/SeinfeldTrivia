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

  enterJudgementState() {
    this.gameState = 'JUDGEMENT';
    logger(`${this.roomCode} is entering the ${this.gameState} game state`);

    clearTimeout(this.roundTimeoutId);
    delete this.roundTimeoutId;
  }

  exitJudgementState(users) {
    // Assign points
    users.forEach(user => {
      if (user.validAnswer) {
        user.score++;
      }
      user.validAnswer = false;
      user.currentAnswer = '';
    })
    this.users = users;
  }

  enterResultState() {
    this.gameState = 'RESULT';
    logger(`${this.roomCode} is entering the ${this.gameState} game state`);

    // clearTimeout(this.roundTimeoutId);
    // delete this.roundTimeoutId;
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
}
