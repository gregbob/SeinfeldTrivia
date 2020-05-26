const logger = require('../utils/logger').extend('room');

module.exports = class Room {
  constructor(roomCode, hostId, onStateChangeCallback) {
    this.roomCode = roomCode;
    this.hostId = hostId;
    this.gameState = 'SETUP';
    this.users = [];
    this.questionStateTime = 15;
    this.resultStateTime = 5;
    this.roundTimeoutId = '';

    this.onStateChangeCallback = onStateChangeCallback;

  }

  addUser(user) {
    this.users.push(user);
  }

  changeState(newState) {
    // Maybe add exit state before
    logger(`${this.roomCode} is entering the ${newState} game state`);
    if (newState == 'SETUP') {

    } else if (newState == 'QUESTION') {
      this._enterQuestionState();
    } else if (newState == 'JUDGEMENT') {
      this._enterJudgementState();
    } else if (newState == 'RESULT') {
      this._enterResultState();
    } else if (newState == 'WRAPUP') {
      
    }
    this.onStateChangeCallback(this);
  }

  _enterQuestionState() {
    this.gameState = 'QUESTION';
    // Reset user answers
    this.users.forEach(user => {
      user.resetAnswer();
      user.validAnswer = false;
    })

    // Will auto advance the round if the timeout is reached
    this.roundTimeoutId = setTimeout(() => {
      this.changeState('JUDGEMENT');
    }, this.questionStateTime * 1000);
  }

  _enterJudgementState() {
    this.gameState = 'JUDGEMENT';

    clearTimeout(this.roundTimeoutId);
    delete this.roundTimeoutId;
  }

  _enterResultState() {
    this.gameState = 'RESULT';

    // Auto advance to question state after resultStateTime has passed
    setTimeout(() => {
      this.changeState('QUESTION');
    }, this.resultStateTime * 1000);
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
      questionStateTime: this.questionStateTime
    }
  }
}
