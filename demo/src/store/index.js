// libraries
import Vue from 'vue'
import Vuex from 'vuex'

// optional configuration
import pathify from './pathify'

// store
import root from './features/root'
import basic from './features/basic'
import users from './users'

pathify.debug()

Vue.use(Vuex)

// store
const store = new Vuex.Store({

  ...root,

  plugins: [pathify.plugin],

  modules: {
    basic,
    ...users,
  },

})

export default store
window.store = store
