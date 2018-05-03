/**
 * Module example
 *
 * Namespaced module, with different property nesting
 */
import { make } from 'vuex-pathify'

const state = {

  value: 456,

  string: 'some value',

  object: {
    value: 'some other value',
    a: {
      b: {
        c: 'some nested value'
      }
    }
  },
}

const mutations = {
  ...make.mutations(state),
}

export default {
  namespaced: true,
  state,
  mutations,
}
