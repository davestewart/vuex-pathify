import { make } from '../src/main';
import { makeStore } from './helpers'

describe('top-level state', () => {
  it('should get state', () => {
    const state = { name: 'Jack', age: 28 }
    const store = makeStore({
      state,
    })

    expect(store.get('name')).toEqual('Jack')
    expect(store.get('age')).toEqual(28)
  })


  it('should set state', () => {
    const state = { name: 'Jack', age: 28 }
    const store = makeStore({ state })

    store.set('name', 'Jill')

    expect(store.state.name).toEqual('Jill')
  })
})

describe('nested state', function () {
  it('should get state', () => {
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
    const store = makeStore({
      state,
    })

    expect(store.get('person@name')).toEqual('Jack')
    expect(store.get('person@age')).toEqual(28)
    expect(store.get('person@pets@[0].animal')).toEqual('cat')
    expect(store.get('person@pets@[0].name')).toEqual('Tabby')
  })

  it('should set state', () => {
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
    const store = makeStore({ state })

    store.set('person@name', 'Jill')
    store.set('person@pets[0].name', 'Spot')

    expect(store.state.person.name).toEqual('Jill')
    expect(store.state.person.pets[0].name).toEqual('Spot')
  })
})

describe('module state', function () {
  it('should get state', () => {
    const state = { name: 'Jack', age: 28 }
    const store = makeStore({
      modules: {
        people: { namespaced: true, state }
      }
    })

    expect(store.get('people/name')).toEqual('Jack')
    expect(store.get('people/age')).toEqual(28)
  })

  it('should set state', () => {
    const state = { name: 'Jack', age: 28 }
    const mutations = make.mutations(state)
    const store = makeStore({
      modules: {
        people: { namespaced: true, state, mutations }
      }
    })

    store.set('people/name', 'Jill')

    expect(store.state.people.name).toEqual('Jill')
  })
})

describe('special functionality', function () {
  describe('key types', () => {
    const state = { object: {}, array: [] }
    const store = makeStore({ state })

    it('alpha keys - should set a key on an object', function () {
      store.set('object@a1', 1)
      expect(store.state.object['a1']).toEqual(1)
    })

    it('numeric keys - should set a key on an object', function () {
      store.set('object@1a', 1)
      expect(store.state.object['1a']).toEqual(1)
    })

    it('numeric keys - should set an index on an array', function () {
      store.set('array@0', 1)
      expect(store.state.array[0]).toEqual(1)
    })
  })

  describe('object creation', () => {
    const state = { target: {} }
    const mutations = make.mutations(state)
    const store = makeStore({ state, mutations })

    it('should create empty objects', function () {
      store.set('target@value', 100)
      expect(store.state.target.value).toEqual(100)
    })

    it('should create empty arrays', function () {
      store.set('target@matrix.0.0', 100)
      expect(store.state.target.matrix[0][0]).toEqual(100)
    })
  })
})

describe('serialized Payload', () => {
  it('serialized Payload should be interpreted', function () {
    const state = { name: { firstName: 'John', lastName: 'Doe' }, age: 28 }
    const mutations = make.mutations(state)
    const store = makeStore({
      modules: {
        people: { namespaced: true, state, mutations }
      }
    })

    store.commit('people/name', { expr: 'people/name@firstname', value: 'Jane', path: 'firstname' })

    expect(store.get('people/name@firstname')).toEqual('Jane')
    expect(store.get('people/age')).toEqual(28)
  })
})
