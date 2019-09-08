import Vue from 'vue'
import Vuex from 'vuex'

import pathify, { make } from '../src/main'

Vue.use(Vuex)

it('can make mutations', () => {
  const state = { name: 'Jack', age: 28 }
  const mutations = make.mutations(state)

  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    state,
    mutations,
  })

  store.commit('SET_AGE', 30)
  store.commit('SET_NAME', 'Jill')
  expect(store.state.name).toEqual('Jill')
  expect(store.state.age).toEqual(30)
})
