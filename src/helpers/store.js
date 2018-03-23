import { resolveName } from '../services/resolver'
import { Payload } from '../utils/Payload'
import { getKeys } from '../utils/object'

/**
 * Utility function to mass-create default getter functions for an existing state object
 *
 * Note that you don't need to create top-level getter functions if using $store.get(...)
 *
 * @example making only 2 getters
 *
 *    const getters = {
 *      ...makeGetters(state, 'foo bar')
 *    }
 *
 * @param   {Object}          state   State object from which to grab key names
 * @param   {String|Array}   [only]   Optional filter value to grab only certain keys. Can be an Array or string of names
 */
export function makeGetters (state, only) {
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const getter = resolveName('getters', key)
      obj[getter] = function (state) {
        return state[key]
      }
      return obj
    }, {})
}

/**
 * Utility function to mass-create default mutation functions for an existing state object
 *
 * @example creating only 2 mutations
 *
 *    const mutations = {
 *      ...makeMutations(state, 'foo bar')
 *    }
 *
 * @param   {Object}        state   State object from which to grab key names
 * @param   {String|Array}  [only]  Optional filter value to grab only certain keys. Can be an Array or string of names
 */
export function makeMutations (state, only) {
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const mutation = resolveName('mutations', key)
      obj[mutation] = function (state, value) {
        value instanceof Payload
          ? value.setValue(state[key])
          : state[key] = value
      }
      return obj
    }, {})
}

/**
 * Utility function to mass-create default actions functions for an existing state object
 *
 *
 * @param   {Object}          state   State object from which to grab key names
 * @param   {String|Array}   [only]   Optional filter value to grab only certain keys. Can be an Array or string of names
 */
export function makeActions (state, only) {
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const action = resolveName('actions', key)
      const mutation = resolveName('mutations', key)
      obj[action] = function ({commit}, value) {
        commit(mutation, value)
      }
      return obj
    }, {})
}

export default {
  getters: makeGetters,
  mutations: makeMutations,
  actions: makeActions,
}
