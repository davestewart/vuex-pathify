import Vue from 'vue'
import Router from 'vue-router'

import Home from 'views/pages/Home'
import Code from 'views/pages/Code'

import features from './modules/features'
import repos from './modules/repos'
import user from './modules/user'

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
    ...features,
    route('/code', Code),
    ...repos,
    ...user,
    route('*', {template: '<div>Route not found</div>'})
  ]
})
