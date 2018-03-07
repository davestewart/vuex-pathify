import settings from '../plugin/settings'

function getFormat (type, value = 'value') {
  const resolver = settings.resolvers[type]
  return resolver
    ? resolver(value)
    : value
}

export default function debug () {
  console.log(`
  Vuex Pathify Config

  Settings
-------------------------------
  deep      : ${settings.deep}
  strict    : ${settings.strict}

  Resolver formats
-------------------------------
  getters   : "${getFormat('getter')}"
  actions   : "${getFormat('action')}"
  mutations : "${getFormat('mutation')}"


`)
}
