// libraries
import Vue from 'vue'
import Vuex from 'vuex'

// optional configuration
import pathify from './pathify'

// store
import { root, module } from 'examples/api/stores/store'
import typical from 'examples/typical/stores/index'
import large from 'examples/large/stores/index'

pathify.debug()

Vue.use(Vuex)

// store
const store = new Vuex.Store({

  ...root,

  modules: {
    module,
    ...typical,
    ...large,
  },

  plugins: [pathify.plugin],

})

export default store
window.store = store
