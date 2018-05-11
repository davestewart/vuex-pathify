// plugin
import vuex from '../helpers/vuex'

// options
import accessorize from '../helpers/accessors'
import options from './options'
import debug from './debug'

/**
 * Store plugin which updates the store object with set() and get() methods
 *
 * @param {Object} store  The store object
 */
function plugin (store) {

  // cache store instance
  vuex.store = store

  // add pathify accessors
  accessorize(store)
}

export default {
  options,
  plugin,
  debug,
}
