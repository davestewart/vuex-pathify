import { hasValue, getValue, setValue } from './object'
import settings from '../plugin/settings'
import formatters from './formatters'

const members = {
  state: 'state',
  getters: 'getters',
  actions: '_actions',
  mutations: '_mutations',
}

/**
 * Default name resolver
 *
 * Adheres to seemingly the most common Vuex naming pattern
 *
 * @param   {string}  type          The member type, i.e state, getters, mutations, or actions
 * @param   {string}  name          The name of the property being targeted
 * @param   {object}  formatters    A formatters object with common format functions
 * @returns {*}
 */
function defaultNameResolver (type, name, formatters) {
  switch(type) {
    case 'mutations':
      return formatters.const('set', name) // SET_BAR
    case 'actions':
      return formatters.camel('set', name) // setBar
  }
  return name // bar
}

/**
 * Creates a resolver object that caches properties and can resolve store member properties
 *
 * @param   {object}  store     The Vuex store instance
 * @param   {string}  path      A pathify path to the store target, i.e. 'foo/bar@a.b.c'
 * @returns {object}
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
    throw new Error(`[Vuex Pathify]: Unknown module '${modPath}' via path '${path}'`)
  }

  // throw error if illegal deep access
  if (!settings.deep && objPath) {
    throw new Error(`[Vuex Pathify]: Illegal attempt to access deep property via path '${path}'`)
  }

  // state
  const absPath = path.replace(/[/@]/g, '.')

  // resolve targets
  return {
    path: absPath,

    /**
     * Returns properties about the targeted member
     *
     * @param   {string}  type  The member type, i.e state, getters, mutations, or actions
     * @returns {{exists: boolean, member: object, type: string, path: string}}
     */
    get: function (type) {
      // targeted member, i.e. store._getters
      const member = store[members[type]]

      // target name, i.e. SET_VALUE
      const name = resolveName(type, target, formatters)

      // target path, i.e. store._getters['module/SET_VALUE']
      const trgPath = modPath
        ? modPath + '/' + name
        : name

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

export function resolveName (type, name) {
  return (settings.resolver || defaultNameResolver)(type, name, formatters)
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

  const action = resolver.get('actions')
  if (action.exists) {
    return function (value) {
      return store.dispatch(action.type, value)
    }
  }

  const mutation = resolver.get('mutations')
  if (mutation.exists) {
    return function (value) {
      return store.commit(mutation.type, mutation.path
        ? new Payload(mutation.path, value)
        : value)
    }
  }
  console.warn(`[Vuex Pathify]: Invalid setter path '${path}'; could not find associated action '${action.type}' or mutation '${mutation.type}'`)
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

  const getter = resolver.get('getters')
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

  console.warn(`[Vuex Pathify]: Invalid getter path '${path}'; could not find associated getter '${getter.type}' or state '${state.type}'`)
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
