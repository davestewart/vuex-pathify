import { isObject, getValue } from './object'

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
 * @returns {object|string}
 */
export function makePaths (path, props, state) {
  // variables
  let paths

  // handle object as path
  if (isObject(path)) {
    props = path
    path = ''
  }

  // resolve wildcards
  if (path.endsWith('*')) {
    if (!state) {
      console.error(`[Vuex Pathify] Unable to create computed properties for path '${path}':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload`)
    }
    paths = expandWildcard(path, state)
    return makePathsHash(paths)
  }

  if (Array.isArray(props)) {
    paths = props
      .map(prop => {
        return makePath(path, prop)
      })
    return makePathsHash(paths)
  }

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
 * Helper function to factor out (trailing-only!) wildcards
 *
 * @param   {string}    path    A path with a wildcard at the end
 * @param   {object}    src     A source object on which to look up the sub-properties
 * @returns {string[]}          An array of paths
 */
export function expandWildcard (path, src) {
  let srcPath = path.replace(/\*$/, '')
  let objPath = srcPath.replace(/\W+$/, '').replace(/\/+/g, '.')
  let obj = getValue(src, objPath)
  if (!obj) {
    console.error(`[Vuex Pathify] Unable to expand wildcard '${path}':
    - It looks like the store path '${objPath}' doesn't resolve to an object`, store.state)
    return []
  }
  return Object.keys(obj).map(key => srcPath + key)
}
