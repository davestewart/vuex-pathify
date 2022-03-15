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

/**
 * Helper function to generate a mixin that registers module and computed properties on component creation
 *
 * @param   {string|Array}  path        The path to register the Vuex module on
 * @param   {object}        module      The module definition to register when the
 * @param   {function}      callback    A callback returning store members to be added to the component definition
 * @param   {object}       [options]    Optional Vuex module registration options
 * @returns {object}                    The mixin
 */
export function registerModule (path, module, callback, options) {
  return {
    beforeCreate () {
      this.$store.registerModule(path, module, options)
      const members = callback()
      this.$options.computed = Object.assign(this.$options.computed || {}, members.computed || {})
      this.$options.methods = Object.assign(this.$options.methods || {}, members.methods || {})
    },

    destroyed () {
      this.$store.unregisterModule(path)
    }
  }
}
