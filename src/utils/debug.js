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

  Resolver scheme
-------------------------------
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

`)
}
