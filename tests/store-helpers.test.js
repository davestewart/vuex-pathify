import { make } from '../src/main'
import { makeStore } from './helpers'

it('should make mutations', () => {
  const state = { name: 'Jack', age: 28 }
  const mutations = make.mutations(state)
  const store = makeStore({
    state,
    mutations,
  })

  store.commit('age', 30)
  store.commit('name', 'Jill')
  expect(store.state.name).toEqual('Jill')
  expect(store.state.age).toEqual(30)
})
