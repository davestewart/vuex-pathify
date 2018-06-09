import { getValue} from '../utils/object'

// -------------------------------------------------------------------------------------------------------------------
// external
// -------------------------------------------------------------------------------------------------------------------

/**
 * Utility function to expand wildcard path for get()
 *
 * @param   {string}        path        wildcard path
 * @param   {object}        state       state hash
 * @param   {object}        getters     getters hash
 * @returns {array|string}
 */
export function expandGet (path, state, getters) {
  if (!init(path, state)) {
    return ''
  }
  return [
    ...resolveStates(path, state),
    ...resolveHandlers(path, getters),
  ]
}

/**
 * Utility function to expand wildcard path for sync()
 *
 * @param   {string}        path        wildcard path
 * @param   {object}        state       state hash
 * @returns {array|string}
 */
export function expandSync (path, state) {
  if (!init(path, state)) {
    return ''
  }
  return resolveStates(path, state)
}

/**
 * Utility function to expand wildcard path for actions()
 *
 * @param   {string}        path        wildcard path
 * @param   {object}        actions     actions hash
 * @returns {array|string}
 */
export function expandCall (path, actions) {
  if (!init(path, actions)) {
    return ''
  }
  return resolveHandlers(path, actions)
}


// -------------------------------------------------------------------------------------------------------------------
// internal
// -------------------------------------------------------------------------------------------------------------------

/**
 * Helper function to resolve state properties from a wildcard path
 *
 * Note: this function traverses into the state object and any properties / sub-properties
 *
 * @param   {string}    path    A path with a wildcard at the end
 * @param   {object}    state   A state object on which to look up the sub-properties
 * @returns {string[]}          An array of paths
 */
export function resolveStates (path, state) {
  // grab segments
  const last = path.match(/([^/@\.]+)$/)[1]
  const main = path.substring(0, path.length - last.length)
  const keys = main.replace(/\W+$/, '').split(/[/@.]/)

  // find state parent
  let obj = main
    ? getValue(state, keys)
    : state
  if (!obj) {
    console.error(`[Vuex Pathify] Unable to expand wildcard path '${path}':
    - It looks like '${main.replace(/\W+$/, '')}' does not resolve to an existing state property`)
    return []
  }

  // filter children
  const rx = new RegExp('^' + last.replace(/\*/g, '\\w+') + '$')
  return Object
    .keys(obj)
    .filter(key => rx.test(key))
    .map(key => main + key)
}

/**
 * Helper function to resolve getters, actions or mutations from a wildcard path
 *
 * Note: this function filters the top-level flat hash of members
 *
 * @param   {string}    path      A path with a wildcard at the end
 * @param   {object}    hash      A hash on which to filter by key => wildcard
 * @returns {string[]}            An array of paths
 */
export function resolveHandlers (path, hash) {
  const rx = new RegExp('^' + path.replace(/\*/g, '\\w+') + '$')
  return Object.keys(hash).filter(key => rx.test(key))
}


// -------------------------------------------------------------------------------------------------------------------
// utility
// -------------------------------------------------------------------------------------------------------------------

/**
 * Pre-flight check for wildcard paths
 *
 * @param   {string}  path
 * @param   {object}  state
 * @returns {boolean}
 */
export function init (path, state) {
  // only wildcards in final path segment are supported
  if (path.includes('*') && /\*.*[/@.]/.test(path)) {
    console.error(`[Vuex Pathify] Invalid wildcard placement for path '${path}':
    - Wildcards may only be used in the last segment of a path`)
    return false
  }

  // edge case where store sometimes doesn't exist
  if (!state) {
    console.error(`[Vuex Pathify] Unable to expand wildcard path '${path}':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload`)
    return false
  }

  return true
}
