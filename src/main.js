// helpers
import { makeGetters, makeMutations, makeActions } from './helpers/store'
import { get, getSome, set, sync, syncSome } from './helpers/component'
import formatters from './utils/formatters'

// settings
import settings from './settings'

// plugins
import initial from './plugins/initial'
import persist from './plugins/persist'
import accessors from './plugins/accessors'

const plugins = {
  initial,
  persist,
  accessors,
}

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

  // settings
  settings,
  formatters,

  // plugins
  plugins,
}
