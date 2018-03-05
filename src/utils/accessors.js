import { getKeys, getValue, setValue } from './object'
import settings from '../settings'

/**
 * Creates a resolver object that Parse and convert a path of the format 'foo/bar@a.b.c' into target and object paths
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
        member: member,
        type: trgPath,
        path: objPath
      }
    }
  }

  // resolve targets
  return {
    // statePath,
    // objPath,
    path: absPath,
    get
  }
}

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
  const action = resolver.get('action')
  if (action) {
    return function (value) {
      return store.dispatch(action.type, value)
    }
  }
  const mutation = resolver.get('mutation')
  if (mutation) {
    return function (value) {
      return store.commit(mutation.type, mutation.path
        ? new Payload(mutation.path, value)
        : value)
    }
  }
  console.warn(`[vuex-superstore]: invalid setter path '${path}' (could not find associated action / mutation)`)
}

/**
 * Creates a getter function for the store, automatically targeting getters or state
 *
 * Also supports returning of sub-properties as part of the path
 *
 * @see documentation for more detail
 *
 * @param   {Object}  store   The store object
 * @param   {string}  path    The path to the target node
 * @returns {*|Function}      The state value or getter function
 */
export function makeGetter (store, path) {
  const resolver = resolve(store, path)
  const getter = resolver.get('getter')
  if (getter) {
    return function (...args) {
      let value = getter.member[getter.type]
      if (getter.path) {
        value = getValue(value, getter.path)
      }
      return value instanceof Function
        ? value(...args)
        : value
    }
  }
  return function () {
    return getValue(store.state, resolver.path)
  }
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
