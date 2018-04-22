// plugin
import cloneDeep from 'lodash.clonedeep'
import { isObject } from '../utils/object'
import { makeGetter, makeSetter} from '../services/accessors'
import vuex from '../helpers/vuex'

// options
import options from './options'
import debug from './debug'

/**
 * Store plugin which updates the store object with set() and get() methods
 *
 * @param {Object} store  The store object
 */
function plugin (store) {

  // initialize plugin
  vuex.store = store

  /**
   * Set a property on the store, automatically using actions or mutations
   *
   * @param   {string}        path    The path to the store member
   * @param   {*}             value   The value to set
   * @returns {Promise|*}             Any return value from the action / commit
   */
  store.set = function (path, value) {
    const setter = makeSetter(store, path)
    if (typeof setter !== 'undefined') {
      return setter(value)
    }
  }

  /**
   * Get a property from the store, automatically using getters or state
   *
   * @param   {string}        path    The path to the store member
   * @param   {*}             args    Optional getter function parameters
   * @returns {*|undefined}           The state value / getter value / getter function / or undefined
   */
  store.get = function (path, ...args) {
    const getter = makeGetter(store, path)
    if (typeof getter !== 'undefined') {
      return getter(...args)
    }
  }

  /**
   * Set a property on the store, automatically using actions or mutations
   *
   * @param   {string}        path    The path to the store member
   * @param   {*}             args    Optional getter function parameters
   * @returns {*|undefined}           The value, or undefined
   */
  store.copy = function (path, ...args) {
    const value = store.get(path, ...args)
    return isObject(value)
      ? cloneDeep(value)
      : value
  }

}

export default {
  options,
  plugin,
  debug,
}
