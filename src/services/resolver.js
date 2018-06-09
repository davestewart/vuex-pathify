import { hasValue } from '../utils/object'
import options from '../plugin/options'
import formatters from './formatters'

/**
 * Map of store members
 */
const members = {
  state: 'state',
  getters: 'getters',
  actions: '_actions',
  mutations: '_mutations',
}

/**
 * Map of default resolver functions
 */
const resolvers = {

  /**
   * Standard name mapping function
   *
   * Adheres to seemingly the most common Vuex naming pattern
   *
   * @param   {string}  type          The member type, i.e state, getters, mutations, or actions
   * @param   {string}  name          The name of the property being targeted, i.e. value
   * @param   {object}  formatters    A formatters object with common format functions, camel, snake, const
   * @returns {string}
   */
  standard (type, name, formatters) {
    switch(type) {
      case 'mutations':
        return formatters.const('set', name) // SET_BAR
      case 'actions':
        return formatters.camel('set', name) // setBar
    }
    return name // bar
  },

  /**
   * Simple name mapping function
   */
  simple (type, name, formatters) {
    if (type === 'actions') {
      return formatters.camel('set', name) // setBar
    }
    return name // bar
  },

}

/**
 * Configured resolver
 */
let resolver

/**
 * Internal function to resolve member name using configured mapping function
 *
 * @param   {string}  type  The member type, i.e. actions
 * @param   {string}  name  The supplied path member id, i.e. value
 * @returns {string}        The resolved member name, i.e. SET_VALUE
 */
export function resolveName (type, name) {
  // bypass resolver
  if (name.match(/!$/)) {
    return name.substr(0, name.length - 1)
  }

  // configured resolver
  let fn = resolver

  // unconfigured resolver! (runs once)
  if (!fn) {
    if (options.mapping instanceof Function) {
      fn = options.mapping
    }
    else {
      fn = resolvers[options.mapping]
      if (!fn) {
        throw new Error(`[Vuex Pathify] Unknown mapping '${options.mapping}' in options
    - Choose one of '${Object.keys(resolvers).join("', '")}'
    - Or, supply a custom function
`)
      }
    }

    resolver = fn
  }

  // resolve!
  return resolver(type, name, formatters)
}

/**
 * Creates a resolver object that caches properties and can resolve store member properties
 *
 * @param   {object}  store     The Vuex store instance
 * @param   {string}  path      A pathify path to the store target, i.e. 'foo/bar@a.b.c'
 * @returns {object}
 */
export function resolve (store, path) {
  // state
  const absPath = path.replace(/[/@!]+/g, '.')

  // paths
  const [statePath, objPath] = path.split('@')

  // parent
  let modPath, trgName
  if (statePath.includes('/')) {
    const keys = statePath.split('/')
    trgName = keys.pop()
    modPath = keys.join('/')
  }
  else {
    trgName = statePath
  }

  // throw error if module does not exist
  if (modPath && !store._modulesNamespaceMap[modPath + '/']) {
    throw new Error(`[Vuex Pathify] Unknown module '${modPath}' via path '${path}'`)
  }

  // resolve targets
  return {
    absPath: absPath,
    module: modPath,
    target: statePath,
    name: trgName.replace('!', ''),

    /**
     * Returns properties about the targeted member
     *
     * @param   {string}  type  The member type, i.e state, getters, mutations, or actions
     * @returns {{exists: boolean, member: object, type: string, path: string}}
     */
    get: function (type) {
      // targeted member, i.e. store._getters
      const member = store[members[type]]

      // resolved target name, i.e. SET_VALUE
      const resName = resolveName(type, trgName)

      // target path, i.e. store._getters['module/SET_VALUE']
      const trgPath = modPath
        ? modPath + '/' + resName
        : resName

      // return values
      return {
        exists: type === 'state'
          ? hasValue(member, trgPath)
          : trgPath in member,
        member: member,
        type: trgPath,
        name: resName,
        path: objPath,
      }
    }
  }
}

/**
 * Error generation function for accessors
 */
export function getError(path, resolver, aName, a, bName, b) {
  let error = `[Vuex Pathify] Unable to map path '${path}':`
  if (path.includes('!')) {
    error += `
    - Did not find ${aName} or ${bName} named '${resolver.name}' on ${resolver.module ? `module '${resolver.module}'`: 'root store'}`
  }
  else {
    const aText = a
      ? `${aName} '${a.name}' or `
      : ''
    const bText = `${bName} '${b.name}'`
    error += `
    - Did not find ${aText}${bText} on ${resolver.module ? `module '${resolver.module}'`: 'store'}
    - Use direct syntax '${resolver.target.replace(/(@|$)/, '!$1')}' (if member exists) to target directly`
  }
  return error
}

