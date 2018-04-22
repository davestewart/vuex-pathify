import pathify from './plugin/pathify'

import make from './helpers/store'
import { get, set, sync } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'
import Payload from './classes/Payload'

export default pathify

export {
  // store
  make,
  Payload,

  // computed
  sync,
  get,
  set,

  // vuex
  commit,
  dispatch
}
