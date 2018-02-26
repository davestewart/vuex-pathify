import cloneDeep from 'lodash.clonedeep'
import { isObject } from '../utils/object'
import { getValue } from '../utils/store'

/**
 * Store plugin which updates the store object with initial() and reset() methods
 *
 * @param {Object} store  The store object
 */
export default function (store) {

  /**
   * Grab an initial copy of the store
   *
   * @type {object}
   */
  const initial = cloneDeep(store.state)

  /**
   * Get a copy of an initial value from the store
   *
   * @param   {string}        path    The path to the store element
   * @returns {*}                     The initial value
   */
  store.initial = function (path) {
    const value = getValue(initial, path)
    return isObject(value)
      ? cloneDeep(value)
      : value
  }

  /**
   * Reset all store data
   */
  store.reset = function () {
    const state = store.state.route
      ? Object.assign(initial, { route: store.state.route })
      : initial
    store.replaceState(state)
  }

}
