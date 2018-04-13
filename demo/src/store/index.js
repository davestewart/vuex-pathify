// libraries
import Vue from 'vue'
import Vuex from 'vuex'

// optional configuration
import pathify from './pathify'

// store
import { root, nested } from './features/root'
import basics from './features/basics'
import repos from './code/repos'
import code from './code/user'

pathify.debug()

Vue.use(Vuex)

// store
const store = new Vuex.Store({

  ...root,

  plugins: [pathify.plugin],

  modules: {
    nested,
    basics,
    ...repos,
    ...code,
  },

})

export default store
window.store = store
