import { make } from 'vuex-pathify'

const state = {
  value: 'this is a test value',
  foo: 'hello world',
  bar: 1,
  baz: {
    a: {
      b: 1
    },
    b: 2,
    c: 3
  }
}

const actions = {
  loadUser ({ commit }, id) {
    return new Promise(function (resolve, reject) {
      console.log('loading user....')
      setTimeout(function () {
        console.log('user loaded!')
        resolve({
          id: id,
          name: 'dave',
          email: 'dave@dave.com',
        })
      }, 1000)
    })
  }
}

const mutations = {
  SET_VALUE: (state, value) => {
    console.log('setting value', state, value)
    state.value = value
  },

  SET_OBJECT: (state, value) => {
    console.log('committing bar', state, value)
    state.bar = value
  },

  ...make.mutations(state),
}

console.log(mutations)

const getters = {
  foo: state => String(state.foo).toUpperCase(),
  value: state => id => state[id]
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
