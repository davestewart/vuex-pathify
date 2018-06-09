# Store helpers


> Store helpers eliminate store boilerplate

## Overview

Store helpers **eliminate boilerplate** by creating redundant 1:1 wiring functions from a supplied state object.

They are implemented as **helper functions** which:
 
- can include only certain store members
- can be mixed in with additional declarations

Each helper builds and returns the appropriate JavaScript functions.


## Usage

The following example illustrates functionality and usage for all the helper functions:

```js
import Api from 'services/Api'
import { make } from 'vuex-pathify'

const state = {
  // namespaced: true, // add this if in module
  items: [],
  status: '',
  filters: {
    search: '',
    sort : { ... } // object sub-properties
  }
}

// make all mutations
const mutations = make.mutations(state)

const actions = {
  // automatically create only `setItems()` action
  ...make.actions('items'),

  // manually add load items action
  loadItems({ dispatch }) {
    Api.get('items').then(data => dispatch('setItems', data))
  },
}

const getters = {
  // make all getters (optional)
  ...make.getters(state),
  
  // overwrite default `items` getter
  items: state => {
    return state.items.map(item => new Item(item))
  },
  
  // add new `filteredItems` getter
  filteredItems: (state, getters) => {
    return getters.items.filter(item => item.title.includes(state.filters.search))
  }
}

export default {
  state,
  mutations,
  actions,
  getters,
}
```
!> Note that the code specifically demonstrates a **getters/action-heavy store** approach in order to show full usage of the `make.*` helpers. However, the Pathify-recommended approach is to **eschew** redundant getters and actions (those which simply proxy work to state and mutations) and only create mutations, letting Pathify do the heavy-lifting for you.

See the store helpers [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=api/store) for an editable, live example.

## API

### Helpers

#### `make.mutations(state: Object | Array | String | Function): Object`

Use `make.mutations()` to generate default mutations for your state object:

```js
const mutations = make.mutations(state)
```

The helper generates the following code:

```js
// `key` is a scoped variable unique to each created function
mutations = {
    SET_ITEMS: (state, value) => state.items = value instanceof Payload
        ? value.update(state[key])
        : value,
    SET_STATUS: (state, value) => state.search = value instanceof Payload
        ? value.update(state[key])
        : value,
    SET_FILTERS: (state, value) => state.filters = value instanceof Payload
        ? value.update(state[key])
        : value,
}
```

Note transparent support for [sub-property writes](/api/properties#sub-property-access) thanks to the Payload class.


#### `make.actions(state: Object | Array | String | Function): Object`

You can use `make.actions()` to generate default actions for your state object:

```js
const actions = make.actions(state)
```

The helper generates the following code:

```js
const actions = {
    setItems: ({commit}, value) => commit('SET_ITEMS', value),
    setStatus: ({commit}, value) => commit('SET_STATUS', value),
    setFilters: ({commit}, value) => commit('SET_FILTERS', value),
}
```

If using Pathify as your core store access mechanism, you generally don't need to create redundant actions, but if you're the kind of developer who prefers accessing the store by **actions only**, this will save you writing them all yourself.


#### `make.getters(state: Object | Array | String | Function): Object`

You can use `make.getters()` to generate default getters for your state object:

```js
const getters = make.getters(state)
```

The helper generates the following code:

```js
const getters = {
  items: state => state.items,
  status: state => state.search,
  filters: state => state.filters,
}
```

If using Pathify as your core store access mechanism, you generally don't need to create redundant getters, but if you're the kind of developer who prefers accessing the store by **getters only**, this will save you writing them all yourself.


### Partial generation

The `make.*` helpers take a variety of argument types, with the expectation to pass in an existing `state` object and create helpers for **all** properties:

```js
const state = { ... }
const mutations = make.mutations(state)
```

However, you can generate only **some** properties by passing alternative parameters:


```js
// strings have properties parsed from them
const mutations = make.mutations('items status')
```
```js
// arrays use the passed values
const mutations = make.mutations(['items', 'status'])
```
```js
// objects use the passed keys
const mutations = make.mutations({items: true, status: true})
```
```js
// functions will be executed; any of the above types can be returned
function state () { ... }
const mutations = make.mutations(state)
```
