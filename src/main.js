import pathify from './plugin/pathify'

import make from './helpers/store'
import { get, sync, call } from './helpers/component'
import { Get, Sync, Call } from './helpers/decorators'
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

  // decorators
  Get,
  Sync,
  Call,

  // vuex
  commit,
  dispatch,
  registerModule,
}
