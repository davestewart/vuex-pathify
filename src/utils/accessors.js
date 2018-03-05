import { getKeys, getValue, setValue } from './object'
import settings from '../settings'

/**
 * Parse and convert a path of the format 'foo/bar@a.b.c' into target and object paths
 *
 * @param   {string}  path      The
 * @param   {string}  ...types
 * @returns {{trgPath: string, objPath: string}}
 */
function resolve (store, path) {
  let [statePath, objPath] = path.split('@')

  // warn over deep access
  if (!settings.deep && objPath) {
    throw new Error(`[vuex-superstore]: Illegal attempt to access deep property via '${path}'`)
  }

  // work out path
  const keys = getKeys(statePath)
  const target = keys.pop()
  const modPath = keys.join('/')
  const absPath = (objPath
    ? (statePath + '.' + objPath)
    : statePath).replace(/\//g, '.')

  // lookup
  const lookup = {
    getter: 'getters',
    action: '_actions',
    mutation: '_mutations',
  }

  // getter
  const get = type => {
    // resolve target name, i.e. SET_VALUE
    const formatter = settings.formatters[type]
    const relPath = formatter
      ? formatter(target)
      : target

    // member variables, i.e. store._getters['module/SET_VALUE']
    const member = store[lookup[type]]
    const trgPath = modPath + '/' + relPath

    // return values
    if(trgPath in member) {
      return {
        // required
        value: member[trgPath], // getter value / action or mutation function
        trgPath,                // 'params/foo'
        absPath,                // 'params.foo.a.b.c'

        // useful
        path,                   // 'params/foo@a.b.c'
        type,                   // 'action'
        member,                 // getters, _actions, or _mutations object

        // not needed
        modPath,                // 'params'
        objPath,                // 'a.b.c'
        relPath,                // 'foo'
      }
    }
  }

  // resolve targets
  return {
    // statePath,
    // objPath,
    absPath,
    get
  }
}


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
export function getData (store, path, ...args) {
  const resolver = resolve(store, path)
  const getter = resolver.get('getter')
  if (getter) {
    let { objPath, value } = getter
    if (objPath) {
      value = getValue(value, objPath)
    }
    return value instanceof Function
      ? value(...args)
      : value
  }
  return getValue(store.state, resolver.absPath)
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
  const resolver = resolve(store, path)
  const action = resolver.get('action')
  if (action) {
    return store.dispatch(action.trgPath, value)
  }
  const mutation = resolver.get('mutation')
  if (mutation) {
    const { trgPath, objPath } = mutation
    return store.commit(trgPath, Payload.create(objPath, value))
  }
  console.warn(`[vuex-superstore]: invalid setter path '${path}' (could not find associated action / mutation)`)
  return false
}

/**
 * Payload class to facilitate the setting of sub-properties on the store
 */
export class Payload {
  constructor (path, value) {
    this.path = path
    this.value = value
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
Payload.create = function (path, value) {
  return path
    ? new Payload(path, value)
    : value
}
