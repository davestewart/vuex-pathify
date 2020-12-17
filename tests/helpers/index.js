import Vue from 'vue';
import Vuex from 'vuex'
import { make } from '../../src/main'
import pathify from './pathify'

Vue.use(Vuex)

export function makeStore (store) {
  if (!store.mutations) {
    store.mutations = make.mutations(store.state)
  }
  return new Vuex.Store({
    plugins: [pathify.plugin],
    ...store
  })
}
