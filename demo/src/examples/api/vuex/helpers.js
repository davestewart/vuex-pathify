/**
 * Pathify helpers example
 *
 * See comments for details
 */
import { make } from 'vuex-pathify'

const state = {
  foo: 1,
  bar: 2,
  baz: {
    value: 3
  },
}

const getters = {
  // creates redundant getters, for those who like them
  ...make.getters(state),

  // additional total function
  total (state) {
    return state.foo + state.bar + state.baz.value
  }
}

const mutations = {

  // creates SET_* functions
  ...make.mutations(state),

  // additional increment function
  INCREMENT_FOO (state) {
    state.foo++
  }
}

const actions = {

  // creates redundant actions, but for foo only
  ...make.actions('foo'),

  // additional loadFoo action
  loadFoo ({commit}) {
    return new Promise (function (resolve, reject) {
      setTimeout(function () {
        const value = Date.now()
        commit('SET_FOO', value)
        resolve(value)
      }, 1000)
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}