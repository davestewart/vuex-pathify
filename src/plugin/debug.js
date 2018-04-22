import options from './options'
import { resolveName } from '../services/resolver'

function resolve (type) {
  return resolveName(type, 'value')
}

export default function debug () {
  console.log(`
  [Vuex Pathify] Options:

  Mapping (${options.mapping instanceof Function ? 'custom' : options.mapping})
-------------------------------
  path       : value
  state      : ${resolve('state')}
  getters    : ${resolve('getters')}
  actions    : ${resolve('actions')}
  mutations  : ${resolve('mutations')}

  Settings
-------------------------------
  strict     : ${options.strict}
  cache      : ${options.cache}
  deep       : ${options.deep}

`)
}
