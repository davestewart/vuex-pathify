import pathify from './plugin/pathify'

import make from './helpers/store'
import { get, sync } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'
import Payload from './classes/Payload'

export default pathify

export {
  // store
  make,
  Payload,

  // computed
  get,
  sync,

  // vuex
  commit,
  dispatch
}
