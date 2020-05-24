import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  items: [],
  room: {
    roomCode: '',
    users: []
  },
};

const mutations = {
  addItem(state, item) {
    state.items.push(item)
  },
  roomCreated(state, room) {
    state.room.roomCode = room.roomCode;
  },
  roomJoined(state, payload) {
    state.room.users.push(payload.playerName);
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
  }
}

const getters = {
  items: state => state.items
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})