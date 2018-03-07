import formatters from '../utils/formatters'

export default {
  // throw error if accesssing an undefined property
  strict: true,

  // allow deep access into vuex objects
  deep: true,

  // resolver functions
  resolvers: {
    getter: formatters.none(),
    action: formatters.camel('set'),
    mutation: formatters.const('set'),
  }
}

window.formatters = formatters
