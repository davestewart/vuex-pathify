# Store helpers


> Store helpers eliminate store boilerplate

## Overview

The store helpers are the last piece in the puzzle to lightweight Vuex projects, as they **eliminate boilerplate** by creating redundant 1:1 wiring functions from a supplied state object.

They are implemented as **helper functions** which:
 
- can include only certain store members
- can be mixed in with additional declarations

Each helper builds and returns the appropriate JavaScript functions.


## Usage

The following illustrates functionality and usage for all the helper functions:

```js
import { make } from 'vuex-pathify'

const state = {
  items: [],
  category: '',
  filters: {
    sort : { ... } // object sub-properties
  }
}

// make all mutations
const mutations = make.mutations(state)

// make `setItems()` action only
const actions = make.actions(state, 'items')

const getters = {
  // make all getters
  ...make.getters(state),
  
  // overwrite default `items` getter
  items: state => {
    return state.items.map(item => new Item(item))
  },
  
  // add new `filteredItems` getter
  filteredItems: (state, getters) => {
    return getters.items.filter(item => item.category === state.category)
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
```

## API

### Helpers

!> The examples on this page use the [example](/resources/setup) setup and the [standard](/guide/mapping.md) mapping scheme

#### `make.mutations(state: Object, filter: *): Object`

Use `make.mutations()` to generate default mutations for your state object:

```js
const mutations = make.mutations(state)
```

The helper generates the following code:

```js
mutations = {
    SET_ITEMS: (state, payload) => payload instanceof Payload
        ? payload.update(state)
        : state.items = payload,
    SET_CATEGORY: (state, payload) => payload instanceof Payload
        ? payload.update(state)
        : state.category = payload,
    SET_FILTERS: (state, payload) => payload instanceof Payload
        ? payload.update(state)
        : state.filters = payload,
}
```

Note transparent support for [sub-property writes](/api/properties#sub-property-access) thanks to the Payload class.


#### `make.actions(state: Object, filter: *): Object`

You can use `make.actions()` to generate default actions for your state object:

```js
const actions = make.actions(state)
```

The helper generates the following code:

```js
const actions = {
    setItems: ({commit}, value) => commit('SET_ITEMS', value),
    setCategory: ({commit}, value) => commit('SET_CATEGORY', value),
    setFilters: ({commit}, value) => commit('SET_FILTERS', value),
}
```

If using Pathify as your core store access mechanism, you generally don't need to create redundant actions, but if you're the kind of developer who prefers accessing the store by **actions only**, this will save you writing them all yourself.


#### `make.getters(state: Object, filter: *): Object`

You can use `make.getters()` to generate default getters for your state object:

```js
const getters = make.getters(state)
```

The helper generates the following code:

```js
const getters = {
  items: state => state.items,
  category: state => state.category,
  filters: state => state.filters,
}
```

If using Pathify as your core store access mechanism, you generally don't need to create redundant getters, but if you're the kind of developer who prefers accessing the store by **getters only**, this will save you writing them all yourself.


### Filtering

All `make.*` helpers can choose which state properties to process via a second argument:


```js
// strings have properties parsed from them
const mutations = make.mutations(state, 'items category')

// arrays use the passed values
const actions = make.actions(state, ['items', 'category'])

// objects use the passed keys
const getters = make.getters(state, {items: true, category: true})
```
