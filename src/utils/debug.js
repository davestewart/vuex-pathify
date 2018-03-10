import config from '../plugin/config'
import { resolveName } from './accessors'

function resolve (type) {
  return resolveName(type, 'name')
}

export default function debug () {
  console.log(`
  Vuex Pathify Config

  Settings
-------------------------------
  deep       : ${config.deep}
  strict     : ${config.strict}

  Resolver (${config.resolver ? 'custom' : 'default'})
-------------------------------
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

`)
}
