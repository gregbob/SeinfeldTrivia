import Vue from 'vue'
import VueRouter from 'vue-router'

import Host from '../views/Host'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/host',
    component: Host
  }]
})