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
  addItem(state, item) {
    state.items.push(item)
  },
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
  SOCKET_addItem: ({
    commit
  }, payload) => commit('addItem', payload),
  createRoom: function ({ commit }){
    this._vm.$socket.emit('createRoom', (response) => {
      commit('roomCreated', response)
    });
  },
  SOCKET_roomJoined: ({commit }, payload) => {
    console.log(payload);
    commit('roomJoined', payload);
  },
  SOCKET_updateGameState: ({ commit }, gameState) => {
    commit('updateGameState', gameState);
  }
}

const getters = {
  currentGameState: state => state.room.gameState,
  questionStateTime: state => state.room.questionStateTime,
  users: state => state.room.users,
  userAnswers: state => state.room.users.filter(user => user.currentAnswer),

}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})