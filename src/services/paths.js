import { isObject } from '../utils/object'

/**
 * Helper function to convert Pathify path syntax paths to objects
 *
 * Handles:
 *
 * - string path
 * - object and array formats
 * - path + object/array format
 * - wildcards in path
 *
 * Returns a single string, or hash of key => paths
 *
 * @param   {string|object|array}  [path]       An optional path prefix
 * @param   {object}                props       An optional hash or array of paths / segments
 * @param   {function}              fnResolver  A function to resolve wildcards
 * @returns {object|string}
 */
export function makePaths (path, props, fnResolver) {
  // handle wildcards
  if (typeof path === 'string' && path.includes('*')) {
    return makePathsHash(fnResolver(path))
  }

  // handle array as path
  if (Array.isArray(path)) {
    return makePathsHash(path)
  }

  // handle object as path
  if (isObject(path)) {
    props = path
    path = ''
  }

  // if props is an array
  if (Array.isArray(props)) {
    const paths = props
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

  // if path is a single string without wildcards
  return path
}

/**
 * Helper function to concatenate two path components into a valid path
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
