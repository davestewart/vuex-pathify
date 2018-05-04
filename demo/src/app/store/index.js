// libraries
import Vue from 'vue'
import Vuex from 'vuex'

// optional configuration
import pathify from './pathify'

// api
import root       from '../../examples/api/vuex/root'
import module     from '../../examples/api/vuex/module'
import wildcards  from '../../examples/api/vuex/wildcards'
import helpers    from '../../examples/api/vuex/helpers'
import icons      from '../../examples/api/vuex/icons'

// code comparisons
import typical    from '../../examples/typical/vuex'
import large      from '../../examples/large/vuex'

pathify.debug()

Vue.use(Vuex)

// store
const store = new Vuex.Store({

  ...root,

  modules: {
    // api
    module,
    wildcards,
    helpers,
    icons,

    // code comparisons
    ...typical,
    ...large,
  },

  plugins: [pathify.plugin],

})

export default store
window.store = store
