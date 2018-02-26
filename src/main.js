// helpers
import { aliasMutations, aliasState, makeGetters, makeMutations } from './helpers/store'
import { get, getSome, set, sync, syncSome } from './helpers/component'

// plugins
import initial from './plugins/initial'
import accessors from './plugins/accessors'
import storage from './plugins/storage'

// settings
import settings from './utils/settings'

export {
  // store
  makeGetters,
  makeMutations,
  aliasState,
  aliasMutations,

  // computed
  sync,
  syncSome,
  get,
  getSome,
  set,

  // plugins
  initial,
  storage,
  accessors,

  // settings
  settings
}
