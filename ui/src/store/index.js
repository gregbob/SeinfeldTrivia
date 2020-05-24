import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
};

const mutations = {
    increment (state) {
        state.count++;
    },
    decrement (state) {
        state.count--;
    }
}

const actions = {
    increment: ({commit}) => commit('increment'),
    decrement: ({commit}) => commit('decrement'),
    SOCKET_customEmit: ({ commit }) => commit('increment')
}

const getters = {
    doubleCount: state => state.count * 2
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})