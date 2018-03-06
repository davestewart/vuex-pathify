import { hasValue, getValue, setValue } from './object'
import settings from '../settings'

const members = {
  state: 'state',
  getter: 'getters',
  action: '_actions',
  mutation: '_mutations',
}

/**
 * Creates a resolver object that Parse and convert a path of the format 'foo/bar@a.b.c' into target and object paths
 *
 * @param   {string}  path      The
 * @param   {string}  ...types
 * @returns {{trgPath: string, objPath: string}}
 */
function resolve (store, path) {
  // paths
  const [statePath, objPath] = path.split('@')

  // module
  let modPath = null
  let target = statePath
  if (statePath.includes('/')) {
    const keys = statePath.split('/')
    target = keys.pop()
    modPath = keys.join('/')
  }

  // throw error if module does not exist
  if (modPath && !store._modulesNamespaceMap[modPath + '/']) {
    throw new Error(`[Vuex Superstore]: Unknown module '${modPath}' via path '${path}'`)
  }

  // throw error if illegal deep access
  if (!settings.deep && objPath) {
    throw new Error(`[Vuex Superstore]: Illegal attempt to access deep property via path '${path}'`)
  }

  // state
  const absPath = path.replace(/[/@]/g, '.')

  // resolve targets
  return {
    path: absPath,
    get: function (type) {
      // resolve target name, i.e. SET_VALUE
      const formatter = settings.resolvers[type]
      const relPath = formatter
        ? formatter(target)
        : target

      // member variables, i.e. store._getters['module/SET_VALUE']
      const member = store[members[type]]
      const trgPath = modPath
        ? modPath + '/' + relPath
        : relPath

      // return values
      return {
        exists: type === 'state'
          ? hasValue(member, trgPath)
          : trgPath in member,
        member: member,
        type: trgPath,
        path: objPath
      }
    }
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
  if (action.exists) {
    return function (value) {
      return store.dispatch(action.type, value)
    }
  }

  const mutation = resolver.get('mutation')
  if (mutation.exists) {
    return function (value) {
      return store.commit(mutation.type, mutation.path
        ? new Payload(mutation.path, value)
        : value)
    }
  }
  console.warn(`[Vuex Superstore]: Invalid setter path '${path}'; could not find associated action '${action.type}' or mutation '${mutation.type}'`)
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
  if (getter.exists) {
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

  const state = resolver.get('state')
  if (state.exists) {
    return function () {
      return getValue(store.state, resolver.path)
    }
  }

  console.warn(`[Vuex Superstore]: Invalid getter path '${path}'; could not find associated getter '${getter.type}' or state '${state.type}'`)
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

Payload.prototype.setValue = function (state) {
  setValue(state, this.path, this.value)
}
