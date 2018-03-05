import formatters from './utils/formatters'

export default {
  // throw error if accesssing an undefined property
  strict: true,

  // allow deep access into vuex objects
  deep: true,

  // accessor name formatters
  formatters: {
    getter: formatters.none(),
    action: formatters.camel('set'),
    mutation: formatters.const('set'),
  },

  // property access order
  orders: {
    get: ['getters', 'state'],
    set: ['actions', 'mutations'],
  },
}
