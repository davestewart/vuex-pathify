import { createStore } from 'vuex'
import { make } from '../../src/main'
import pathify from './pathify'

export function makeStore (store) {
  if (!store.mutations) {
    store.mutations = make.mutations(store.state)
  }
  return createStore({
    plugins: [pathify.plugin],
    ...store
  })
}
