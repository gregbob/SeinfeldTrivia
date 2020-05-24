import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    items: []
};

const mutations = {
    addItem (state, item) {
        state.items.push(item)
    }
}

const actions = {
    SOCKET_addItem: ({ commit }, payload) => commit('addItem', payload)
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