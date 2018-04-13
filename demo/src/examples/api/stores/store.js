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
    value: 789,
    nested: {
      a: {
        b: {
          c: 'hello world'
        }
      }
    },
  },

  wildcard: {
    a: 'a',
    b: 'b',
    c: 'c'
  }
}

const getters = {
  value: state => String(state.value).toUpperCase(),
  //value: state => id => state[id],
}

const mutations = {
  ...make.mutations(state),
}

export const module = {
  namespaced: true,
  state,
  getters,
  mutations,
}
