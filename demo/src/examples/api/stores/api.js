import { make } from 'vuex-pathify'

export const root = {
  state: {
    value: 123,
  }
}

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

export const module = {
  namespaced: true,
  state,
  mutations,
}
