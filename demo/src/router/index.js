import Vue from 'vue'
import Router from 'vue-router'

import Home from '../views/pages/Home'
import Code from '../views/pages/Code'

import api from './api'
import repos from './typical'
import user from './large'

Vue.use(Router)

export function route (path, component) {
  return { path, component }
}

export default new Router({
  // mode: 'history',
  linkActiveClass: 'is-link-active',
  linkExactActiveClass: 'is-link-exact',
  routes: [
    { path: '/', redirect:'/home' },
    route('/home', Home),
    ...api,
    route('/code', Code),
    ...repos,
    ...user,
    route('*', {template: '<div>Route not found</div>'})
  ]
})
