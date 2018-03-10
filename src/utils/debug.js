import options from '../plugin/options'
import { resolveName } from './accessors'

function resolve (type) {
  return resolveName(type, 'name')
}

export default function debug () {
  console.log(`
  Vuex Pathify options

  Settings
-------------------------------
  deep       : ${options.deep}
  strict     : ${options.strict}

  Resolver (${options.resolver ? 'custom' : 'default'})
-------------------------------
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

`)
}
