import { getKeys, getValue, setValue } from './object'
import settings from '../settings'

/**
 * Gets data from the store via a path, automatically using getters or state
 *
 * Also supports returning of sub-properties as part of the path
 *
 * @see documentation for more detail
 *
 * @param   {Object}  store   The store object
 * @param   {string}  path    The path to the target node
 * @returns {*|Function}      The state value or getter function
 */
export function getData (store, path) {
  const getter = getAccessor(store.getters, path)
  if (getter) {
    const { value, subKeys } = getter
    return subKeys.length
      ? getValue(value, subKeys)
      : value
  }
  return getValue(store.state, path)
}

/**
 * Sets data on the store via a path, automatically using actions or mutations
 *
 * Also supports setting of sub-properties as part of the path
 *
 * @see documentation for more detail
 *
 * @param   {Object}  store   The store object
 * @param   {string}  path    The path to the target node
 * @param   {*}       value   The value to set
 * @returns {*|Promise}       The return value from the commit() or dispatch()
 */
export function setData (store, path, value) {
  const action = getAccessor(store._actions, path)
  if (action && action.subKeys.length === 0) {
    return store.dispatch(action.type, value)
  }
  const mutation = getAccessor(store._mutations, path)
  if (mutation) {
    const { type, allKeys } = mutation
    return store.commit(type, Payload.create(value, allKeys))
  }
  console.error(`[vuex-helper] invalid setter path '${path}'`)
  return false
}

/**
 * Payload class to facilitate the setting of sub-properties on the store
 */
export class Payload {

  constructor (value, keys) {
    this.value = value
    this.keys = keys
    this.path = keys.join('.')
  }

  /**
   * Set the property on the target object
   *
   * @param   {Object}  state   The current state
   * @returns {Object}          The updated state
   */
  assign (state) {
    return setValue(state, this.keys, this.value)
  }

}

/**
 * Utility function to return a Payload or value, depending on the input path
 *
 * - paths without sub-keys return the original value
 * - paths with sub keys return a Payload to be used in commit() methods
 *
 * @param   {*}         value
 * @param   {Array}     keys
 * @returns {Payload|*}
 */
Payload.create = function (value, keys) {
  return keys.length > 1
    ? new Payload(value, keys)
    : value
}
