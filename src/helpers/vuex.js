import { makeGetter, makeSetter } from '../services/store.js'
import { clone, isObject } from '../utils/object.js'

const vuex = {
  /**
   * THIS OBJECT IS REPLACED AT RUNTIME WITH THE ACTUAL VUEX STORE
   */
  store: {
    state: null,

    commit () {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    },

    dispatch () {
      if (process.env.NODE_ENV !== 'production') {
        console.error('[Vuex Pathify] Plugin not initialized!')
      }
    }
  }
}

export function getStore () {
  return vuex.store
}

export function setStore (store) {
  // set store
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
      const value = getter()
      return typeof value === 'function'
        ? value(...args)
        : value
    }
  }

  /**
   * Get a copy of a property from the store, automatically using actions or mutations
   *
   * @param   {string}        path    The path to the store member
   * @param   {*}             args    Optional getter function parameters
   * @returns {*|undefined}           The value, or undefined
   */
  store.copy = function (path, ...args) {
    const value = store.get(path, ...args)
    return isObject(value)
      ? clone(value)
      : value
  }
}

export function commit (...args) {
  vuex.store.commit(...args)
}

export function dispatch (...args) {
  return vuex.store.dispatch(...args)
}

