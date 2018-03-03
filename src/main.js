// helpers
import { aliasMutations, aliasState, makeGetters, makeMutations } from './helpers/store'
import { get, getSome, set, sync, syncSome } from './helpers/component'
import formatters from './utils/formatters'

// plugins
import initial from './plugins/initial'
import persist from './plugins/persist'
import accessors from './plugins/accessors'

// settings
import settings from './settings'

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
  persist,
  accessors,

  // settings
  settings,
  formatters
}
