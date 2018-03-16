import pathify from './plugin/pathify'

import { makeGetters, makeMutations, makeActions } from './helpers/store'
import { get, set, sync } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'

export default pathify

export {
  // store
  makeGetters,
  makeMutations,
  makeActions,

  // computed
  sync,
  get,
  set,

  // vuex
  commit,
  dispatch
}
