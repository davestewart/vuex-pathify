import pathify from './plugin/pathify'

import make from './helpers/store'
import { get, sync, call } from './helpers/component'
import { commit, dispatch } from './helpers/vuex'
import { registerModule } from './helpers/modules'
import Payload from './classes/Payload'

export default pathify

export {
  // store
  make,
  Payload,

  // component
  get,
  sync,
  call,

  // vuex
  commit,
  dispatch,
  registerModule,
}
