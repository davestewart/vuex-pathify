/**
 * Module example
 *
 * Namespaced module, with various data types and nested properties
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

  wildcard: {
    x: 'x',
    y: 'y',
    z: 'z'
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
