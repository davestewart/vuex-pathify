import options from '../plugin/options'
import { resolveName } from '../services/resolver'

function resolve (type) {
  return resolveName(type, 'name')
}

export default function debug () {
  console.log(`
  [Vuex Pathify] Options:

  Resolver (${options.resolver instanceof Function ? 'custom' : options.resolver})
-------------------------------
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

  Settings
-------------------------------
  deep       : ${options.deep}
  strict     : ${options.strict}

`)
}
