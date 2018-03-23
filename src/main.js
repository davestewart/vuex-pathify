import pathify from './plugin/pathify'

import make from './helpers/store'
import { get, set, sync } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'

export default pathify

export {
  // store
  make,

  // computed
  sync,
  get,
  set,

  // vuex
  commit,
  dispatch
}
