import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import store from './store'
import VueAxios from 'vue-axios'
import VueSocketIO from 'vue-socket.io'
import SocketIO from "socket.io-client"

Vue.config.productionTip = false
Vue.use(VueAxios, axios);

Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://192.168.0.197:3000'),
  vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
  },
}))

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
