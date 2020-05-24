import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    items: [],
    room: {
        roomCode: ''
    }
};

const mutations = {
    addItem (state, item) {
        state.items.push(item)
    },
    roomCreated (state, room) {
        state.room.roomCode = room.roomCode;
    }
}

const actions = {
    SOCKET_addItem: ({ commit }, payload) => commit('addItem', payload),
    SOCKET_roomCreated: ({ commit }, payload) => commit('roomCreated', payload)
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