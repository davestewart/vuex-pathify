import settings from '../settings'
import formatters from '../utils/formatters'
import { Payload } from '../utils/accessors'
import { getKeys, getValue, setValue } from '../utils/object'

/**
 * Utility function to mass-create default getter functions for an existing state object
 *
 * Note that you don't need to create top-level getter functions if using $store.get(...)
 *
 * @usage making only 2 getters
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
      obj[key] = function (state) {
        return state[key]
      }
      return obj
    }, {})
}

/**
 * Utility function to alias state properties as getters
 *
 * @usage aliasing a sub-property
 *
 *   const getters = {
 *     ...aliasState(state, {
 *       qux: 'foo.qux'
 *     })
 *   }
 *
 * @param   {Object}    state     State object from which to alias names
 * @param   {Object}   [aliases]  Hash of alias:state path pairs to pull state from
 */
export function aliasState (state, aliases) {
  return getKeys(aliases)
    .reduce(function (obj, key) {
      const path = aliases[key]
      obj[key] = function (state, value) {
        return getValue(state, path, value)
      }
      return obj
    }, {})
}

/**
 * Utility function to mass-create default mutation functions for an existing state object
 *
 * @usage creating only 2 mutations
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
      obj[key] = function (state, value) {
        value instanceof Payload
          ? value.assign(state)
          : state[key] = value
        return state
      }
      return obj
    }, {})
}

/**
 * Utility function to alias mutation functions for a Store object
 *
 * @usage aliasing mutation of sub-property
 *
 *   const mutations = {
 *     ...aliasMutations(state, {
 *       qux: 'foo.qux'
 *     })
 *   }
 *
 * @param   {Object}    state     State object from which to grab key names
 * @param   {Object}   [aliases]  Hash of alias:mutation path pairs to commit values to
 */
export function aliasMutations (state, aliases) {
  return getKeys(aliases)
    .reduce(function (obj, key) {
      const path = aliases[key]
      obj[key] = function (state, value) {
        setValue(state, path, value)
        return state
      }
      return obj
    }, {})
}
