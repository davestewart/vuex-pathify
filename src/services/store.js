import { getValue } from '../utils/object'
import { getError, resolve } from './resolver'
import Payload from '../classes/Payload'
import options from '../plugin/options'

/**
 * Creates a setter function for the store, automatically targeting actions or mutations
 *
 * Also supports setting of sub-properties as part of the path
 *
 * @see documentation for more detail
 *
 * @param   {Object}  store   The store object
 * @param   {string}  path    The path to the target node
 * @returns {*|Promise}       The return value from the commit() or dispatch()
 */
export function makeSetter (store, path) {
  const resolver = resolve(store, path)

  const action = resolver.get('actions')
  if (action.exists) {
    return function (value) {
      const payload = action.objPath
        ? new Payload(path, action.objPath, value)
        : value
      return store.dispatch(action.trgPath, payload)
    }
  }

  const mutation = resolver.get('mutations')
  if (mutation.exists) {
    return function (value) {
      const payload = mutation.objPath
        ? new Payload(path, mutation.objPath, value)
        : value
      return store.commit(mutation.trgPath, payload)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(getError(path, resolver, 'action', action, 'mutation', mutation))
  }

  return value => {}
}

/**
 * Creates a getter function for the store, automatically targeting getters or state
 *
 * Also supports returning of sub-properties as part of the path
 *
 * @see documentation for more detail
 *
 * @param   {Object}    store       The store object
 * @param   {string}    path        The path to the target node
 * @param   {boolean}  [stateOnly]  An optional flag to get from state only (used when syncing)
 * @returns {*|Function}            The state value or getter function
 */
export function makeGetter (store, path, stateOnly) {
  const resolver = resolve(store, path)

  // for sync, we don't want to read only from state
  let getter
  if (!stateOnly) {
    getter = resolver.get('getters')
    if (getter.exists) {
      return function () {
        const value = getter.member[getter.trgPath]
        return getter.objPath
          ? getValueIfEnabled(path, value, getter.objPath)
          : value
      }
    }
  }

  const state = resolver.get('state')
  if (state.exists) {
    return function () {
      return getValueIfEnabled(path, store.state, resolver.absPath)
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    console.error(getError(path, resolver, 'getter', getter, 'state', state))
  }

  return () => {}
}

/**
 * Utility function to get value from store, but only if options allow
 *
 * @param   {string}  expr    The full path expression
 * @param   {object}  source  The source object to get property from
 * @param   {string}  path    The full dot-path on the source object
 * @returns {*}
 */
function getValueIfEnabled(expr, source, path) {
  if (!options.deep && expr.includes('@')) {
    console.error(`[Vuex Pathify] Unable to access sub-property for path '${expr}':
    - Set option 'deep' to 1 to allow it`)
    return
  }
  return getValue(source, path)
}
