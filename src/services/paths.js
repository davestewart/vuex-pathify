import { isObject, getValue } from '../utils/object'

/**
 * Helper function to convert Pathify path syntax paths to objects
 *
 * Handles:
 *
 * - wildcards in path
 * - object sub-property format
 *
 * @param   {string|object}   [path]    An optional path prefix
 * @param   {object}           props    An optional hash or array of paths / segments
 * @param   {object}           state    The root state object
 * @param   {object}           getters  The root getters object
 * @returns {object|string}
 */
export function makePaths (path, props, state, getters) {
  // variables
  let paths

  // handle object as path
  if (isObject(path)) {
    props = path
    path = ''
  }

  // path contains a wildcard
  if (path.includes('*')) {

    // only wildcards at end of path are supported
    if (path.indexOf('*') !== path.length - 1) {
      console.error(`[Vuex Pathify] Invalid wildcard syntax for path '${path}':
      - Wildcards may only be used at the end of a path`)
      return ''
    }

    // edge case where store sometimes doesn't exist
    if (!state) {
      console.error(`[Vuex Pathify] Unable to create computed properties for path '${path}':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload`)
    }

    // otherwise, resolve paths!
    paths = expandWildcardStates(path, state)

    // getters are only passed for get() operations
    if (getters) {
      let strings = expandWildcardGetters(path, getters)
      paths = [ ...paths, ...strings]
    }

    return makePathsHash(paths)
  }

  // if props is an array
  if (Array.isArray(props)) {
    paths = props
      .map(prop => {
        return makePath(path, prop)
      })
    return makePathsHash(paths)
  }

  // if props is an object
  if (isObject(props)) {
    return Object
      .keys(props)
      .reduce((paths, key) => {
        paths[key] = makePath(path, props[key])
        return paths
      }, {})
  }

  // path must be a string without wildcards
  return path
}

/**
 * Concatenate two path components into a valid path
 *
 * Handles one or no "/" "@" or '.' characters in either string
 *
 * @param   {string}  path
 * @param   {string}  target
 * @returns {string}
 */
export function makePath (path, target = '') {
  path = path.replace(/\/+$/, '')
  const value = path.includes('@')
    ? path + '.' + target
    : path + '/' + target
  return value
    .replace(/^\/|[.@/]+$/, '')
    .replace(/\/@/, '@')
    .replace(/@\./, '@')
}

/**
 * Helper function to convert an array of paths to a hash
 *
 * Uses the last path segment as the key
 *
 * @param   {string[]}  paths   An array of paths to convert to a hash
 * @returns {object}            A hash of paths
 */
export function makePathsHash (paths) {
  return paths.reduce((paths, path) => {
    const key = path.match(/\w+$/)
    paths[key] = path
    return paths
  }, {})
}

/**
 * Helper function to resolve wildcard paths from state
 *
 * Note: this function traverses into the state object and any properties / sub-properties
 *
 * @param   {string}    path    A path with a wildcard at the end
 * @param   {object}    state   A state object on which to look up the sub-properties
 * @returns {string[]}          An array of paths
 */
export function expandWildcardStates (path, state) {
  const srcPath = path
    .replace(/\*$/, '')   // remove wildcard
  const objPath = srcPath
    .replace(/\W+$/, '')  // replace trailing tokens
    .replace(/\/+/g, '.') // replace slashes with dots
  let obj = getValue(state, objPath)
  if (!obj) {
    console.error(`[Vuex Pathify] Unable to expand wildcard '${path}':
    - It looks like '${objPath}' does not resolve to an existing state property`)
    return []
  }
  return Object.keys(obj).map(key => srcPath + key)
}

/**
 * Helper function to resolve wildcard paths from getters
 *
 * Note: this function filters the top-level flattened hash of getters
 *
 * @param   {string}    path      A path with a wildcard at the end
 * @param   {object}    getters   A getters hash on which to filter by key => wildcard
 * @returns {string[]}            An array of paths
 */
export function expandWildcardGetters (path, getters) {
  const srcPath = path.replace(/\/?\*$/, '')
  const rx = new RegExp('^' + srcPath + '/\\w+$')
  return Object.keys(getters).filter(key => rx.test(key))
}
