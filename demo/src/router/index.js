import Vue from 'vue'
import Router from 'vue-router'

import basics from './modules/basics'
import users from './modules/users'

Vue.use(Router)

export function route (path, component) {
  return { path, component }
}

export default new Router({
  mode: 'history',
  routes: [
    ...basics,
    ...users,
    route('*', {template: '<div>Route not found</div>'})

  ]
})
