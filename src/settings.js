import formatters from './utils/formatters'

export default {
  // throw error if trying to access an undefined property
  strict: true,

  // allow deep access into vuex objects
  deep: true,

  // naming formats
  formats: {
    getters: formatters.camel('get'),
    actions: formatters.camel('set'),
    mutations: formatters.const('set'),
  },

  // property access order
  orders: {
    get: ['getters', 'state'],
    set: ['actions', 'mutations'],
  },
}
