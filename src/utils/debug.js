import settings from '../plugin/settings'
import { resolveName } from './accessors'

function resolve (type) {
  return resolveName(type, 'value')
}

export default function debug () {
  console.log(`
  Vuex Pathify Config

  Settings
-------------------------------
  deep       : ${settings.deep}
  strict     : ${settings.strict}

  Resolver formats
-------------------------------
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}


`)
}
