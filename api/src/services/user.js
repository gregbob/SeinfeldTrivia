module.exports = class User {
  constructor(name, characterIndex, id) {
    this.id = id;
    this.name = name;
    this.currentAnswer = '';
    this.score = 0;
    this.validAnswer = false;
    this.characterIndex = characterIndex;
    // this.icon = icon;
  }

  updateScore(score) {
    this.score += score;
  }

  resetAnswer() {
    this.currentAnswer = '';
  }
}