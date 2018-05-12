import cloneDeep from 'lodash.clonedeep'
import { isObject } from '../utils/object'
import { makeGetter, makeSetter } from '../services/store'

export default function (store) {

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
      const value = getter()
      return value instanceof Function
        ? value(...args)
        : value
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