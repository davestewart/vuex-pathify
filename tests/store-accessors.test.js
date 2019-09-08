import Vue from 'vue';
import Vuex from 'vuex';
import pathify, { make } from '../src/main';


Vue.use(Vuex)

it('can get state', () => {
  const state = { name: 'Jack', age: 28 }

  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    state,
  })

  expect(store.get('name')).toEqual('Jack')
  expect(store.get('age')).toEqual(28)
})

it('can get nested state', () => {
  const state = {
    person: {
      name: 'Jack',
      age: 28,
      pets: [{
        animal: 'cat',
        name: 'Tabby',
      }],
    },
  }

  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    state,
  })

  expect(store.get('person@name')).toEqual('Jack')
  expect(store.get('person@age')).toEqual(28)
  expect(store.get('person@pets@[0].animal')).toEqual('cat')
  expect(store.get('person@pets@[0].name')).toEqual('Tabby')
})

it('can get module state', () => {
  const state = { name: 'Jack', age: 28 }

  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    modules: {
      people: { namespaced: true, state }
    }
  })

  expect(store.get('people/name')).toEqual('Jack')
  expect(store.get('people/age')).toEqual(28)
})

it('can set state', () => {
  const state = { name: 'Jack', age: 28 }
  const mutations = make.mutations(state)
  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    state,
    mutations,
  })

  store.set('name', 'Jill')

  expect(store.state.name).toEqual('Jill')
})

it('can set nested state', () => {
  const state = {
    person: {
      name: 'Jack',
      age: 28,
      pets: [{
        animal: 'cat',
        name: 'Tabby',
      }],
    },
  }
  const mutations = make.mutations(state)
  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    state,
    mutations,
  })

  store.set('person@name', 'Jill')
  store.set('person@pets[0].name', 'Spot')

  expect(store.state.person.name).toEqual('Jill')
  expect(store.state.person.pets[0].name).toEqual('Spot')
})

it('can set module state', () => {
  const state = { name: 'Jack', age: 28 }
  const mutations = make.mutations(state)
  const store = new Vuex.Store({
    plugins: [pathify.plugin],
    modules: {
      people: { namespaced: true, state, mutations }
    }
  })

  store.set('people/name', 'Jill')

  expect(store.state.people.name).toEqual('Jill')
})
