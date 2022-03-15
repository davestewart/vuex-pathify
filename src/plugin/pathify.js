// plugin
import { setStore } from '../helpers/vuex'

// options
import options from './options'
import debug from './debug'

/**
 * Store plugin which updates the store object with set() and get() methods
 *
 * @param {Object} store  The store object
 */
function plugin (store) {
  setStore(store)
}

export default {
  options,
  plugin,
  debug,
}
