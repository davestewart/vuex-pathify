import formatters from '../utils/formatters'
import { Payload } from '../utils/accessors'
import { getKeys } from '../utils/object'
import settings from '../plugin/settings'

function formatter (name) {
  return settings.resolvers[name] || formatters.none
}

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
  const format = formatter('getter')
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const name = format(key)
      obj[name] = function (state) {
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
  const format = formatter('mutation')
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const name = format(key)
      obj[name] = function (state, value) {
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
  const aFormat = formatter('action')
  const mFormat = formatter('mutation')
  return getKeys(only || state)
    .reduce(function (obj, key) {
      const aName = aFormat(key)
      const mName = mFormat(key)
      obj[aName] = function ({commit}, value) {
        commit(mName, value)
      }
      return obj
    }, {})
}


