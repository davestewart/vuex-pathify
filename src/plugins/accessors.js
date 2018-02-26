import cloneDeep from 'lodash.clonedeep'
import { isObject } from '../utils/object'
import { getData, setData } from '../utils/accessors'

/**
 * Store plugin which updates the store object with set() and get() methods
 *
 * @param {Object} store  The store object
 */
export default function (store) {

  /**
   * Get a property from the store, automatically using getters or state
   *
   * @param   {string}        path    The path to the store element
   * @param   {*}             value   The value to set
   * @returns {Promise|*}             Any return value from the action / commit
   */
  store.set = function (path, value) {
    return setData(store, path, value)
  }

  /**
   * Set a property on the store, automatically using actions or mutations
   *
   * @param   {string}        path    The path to the store element
   * @param   {boolean}       clone   An optional flag to return a deep clone of the data
   * @returns {*|undefined}           The value, or undefined
   */
  store.get = function (path, clone) {
    const value = getData(store, path)
    return clone && isObject(value)
      ? cloneDeep(value)
      : value
  }

}
