import pathify from './plugin/pathify'

import { makeGetters, makeMutations, makeActions } from './helpers/store'
import { get, getSome, set, sync, syncSome } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'

export default pathify

export {
  // store
  makeGetters,
  makeMutations,
  makeActions,

  // computed
  sync,
  syncSome,
  get,
  getSome,
  set,

  // vuex
  commit,
  dispatch
}
