import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home'
import Host from '../views/Host'
import Play from '../views/Play'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: Home },
    { path: '/host', component: Host },
    { path: '/play', component: Play }
  ]
})