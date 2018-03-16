import options from '../plugin/options'
import { resolveName } from '../services/resolver'

function resolve (type) {
  return resolveName(type, 'value')
}

export default function debug () {
  console.log(`
  [Vuex Pathify] Options:

  Resolver (${options.resolver instanceof Function ? 'custom' : options.resolver})
-------------------------------
  state      : ${resolve('state')}
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

  Settings
-------------------------------
  strict     : ${options.strict}
  deep       : ${options.deep}

`)
}
