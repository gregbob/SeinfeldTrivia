import Vue from 'vue'
import Vuex from 'vuex'
import GameState from '../utils/gameState'

Vue.use(Vuex)

const state = {
  items: [],
  room: {
    roomCode: '',
    users: [],
    gameState: GameState.SETUP,
    questionStateTime: 0
  }
};

const mutations = {
  roomCreated(state, room) {
    state.room.roomCode = room.roomCode;
  },
  roomJoined(state, user) {
    state.room.users.push(user.name);
  },
  updateGameState(state, room) {
    Object.assign(state.room, room);
  }
}

const actions = {
  createRoom: function ({ commit }){
    this._vm.$socket.emit('createRoom', (response) => {
      commit('roomCreated', response)
    });
  },
  SOCKET_roomJoined: ({commit }, payload) => {
    commit('roomJoined', payload);
  },
  SOCKET_updateGameState: ({ commit }, gameState) => {
    commit('updateGameState', gameState);
  }
}

const getters = {
  users: state => state.room.users,
  userAnswers: state => state.room.users.filter(user => user.currentAnswer),
  currentQuestion: state => state.room.currentQuestion.question,
  currentAnswer: state => state.room.currentQuestion.answer,
  currentGameState: state => state.room.gameState,
  questionStateTime: state => state.room.questionStateTime,
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})