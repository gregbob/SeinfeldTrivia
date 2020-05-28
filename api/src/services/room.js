const logger = require('../utils/logger').extend('room');
const shuffle = require('shuffle-array');

module.exports = class Room {
  constructor(roomCode, hostId, options, onStateChangeCallback) {
    this.roomCode = roomCode;
    this.hostId = hostId;
    this.gameState = 'SETUP';
    this.users = [];
    this.questionStateTime = options.questionStateTime;
    this.resultStateTime = 10;
    this.roundTimeoutId = '';

    const { questions } = require('../assets/questions.json');
    this.questions = this.getRandomSubset(options.numberOfQuestions, questions);
    this.currentQuestionIndex = -1;

    this.onStateChangeCallback = onStateChangeCallback;

  }

  getRandomSubset(size, array) {
    if (size >= array.length) {
      size = array.length;
    }

    shuffle(array);
    return array.slice(0, size);

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

    // Advance to next question
    this.currentQuestionIndex++;

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
      questionStateTime: this.questionStateTime,
      currentQuestion: this.questions[this.currentQuestionIndex]
    }
  }
}
