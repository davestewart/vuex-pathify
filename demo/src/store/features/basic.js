import { make } from 'vuex-pathify'

function state () {
  return {
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
}

const actions = {
  loadUser ({commit}, id) {
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
  SET_FOO: (state, value) => {
    console.log('committing foo', state, value)
    state.foo = value
  },

  SET_BAR: (state, value) => {
    console.log('committing bar', state, value)
    state.bar = value
  },

  ...make.mutations(state, 'baz'),
}

const getters = {
  foo: state => String(state.foo).toUpperCase(),
  test: state => id => state[id]
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
}
