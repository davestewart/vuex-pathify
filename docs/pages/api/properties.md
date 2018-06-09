# Advanced property access

> Detailed information on store property access

## Overview

Pathify's unified path syntax and mapping simplifies property access to Vuex, at the expense of some minor flexibility.

This section covers:

- [accessor priority](#accessor-priority) - how Pathify simplifies get / set operations
- [direct property access](#direct-property-access) - how to override mapping and target properties manually
- [sub-property access](#sub-property-access) - how Pathify writes to state sub-properties
- [errors](#errors) - what happens if Pathify fails to map a path to a store member


## Usage

See the advanced property access [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=api/properties) for an editable, live example.

## Details

### Accessor priority

As outlined in the [intro](/intro/pathify.md) Pathify **automatically** determines whether to get via **state or getters**, or set via **actions or mutations**. This feature is called **Accessor Priority** and results in a significant simplification of Vuex's API.
 
The basic premise is this:

- Vuex has 2 ways to:
    - get data; **state** and **getters**
    - set data; **mutations** and **actions**
- when accessing a property, say `items`, if found:
    - a mapped **getter** will be prioritised over a mapped **state** (as the getter will reference it)
    - a mapped **action** will be prioritised over a mapped **mutation** (as the action will call it) 


This logic and implementation serves several purposes:

1. Reduces the decision making process outside of the store; if you want a value, you just **ask for it**

    ```js
// don't care about the implementation, just get/set the value
store.get('items')
store.set('items', data)
    ```

2. Reduces awkward syntax juggling in modules:

    ```js
// single, unified format
store.get('products/items')
    ```
    ```js
// rather than...
store.state.products.items
store.getters['products/items']
    ```

3. Supports a pattern where the `state` can be the "single source of truth" and the `getter` works as a "transformer" function:

    ```js
    state: {
        // store item objects...
        items: [ {}, {}, ... ],
    },
    getters: {
        // ...return Item models
        items (state) => state.items.map(item => new Item(item))
    }
    ```

Overall the prioritised approach covers the majority of get/set wiring cases, and enables Pathify's APIs to remain simple.



### Direct property access

Pathify's [mapping](/setup/mapping.md) algorithm is designed to **map paths to store members** in a predictable 1:1 manner, for example:

```js
get('items')        // state.items
set('items', data)  // actions.setItems
```

This is great for everyday **get/set** usage, but can't account for more nuanced access like `mutations.INCREMENT_VALUE` or `actions.updateItems()`. To work round this, you can reference store members directly.

#### `Direct access syntax`

To **skip** mapping and reference a member directly, append a bang `!` to the property name:

```js
// call the `INCREMENT_VALUE` mutation directly
set('INCREMENT_VALUE!')
```
```js
// call the `updateItems()` action, rather than `setItems()`
set('updateItems!', data)
```

Note that even though direct access syntax skips the mapping function, it still respects [accessor priority](/api/properties.md#accessor-priority).


#### `Vuex aliases`

To skip Pathify entirely when setting data, you can use **Vuex aliases**.

These are Vuex's own methods, but bound to your project's store, and for convenience, available as imports from Pathify:

```js
// import 
import { commit, dispatch } from 'vuex-pathify'

// mutations
commit('INCREMENT_VALUE')

// actions
dispatch('updateItems', data)
```

#### `Access Vuex directly`

Finally, you can simply access your store **directly**:

```js
// get value
const items = this.$store.state.items

// set value
this.$store.dispatch('updateItems', data)
```
 

### Sub-property access

Sub-property **reads** are handled by transparently by Pathify's store accessors, whilst sub-property **writes** are handled by the store helper's [make.mutations()](/api/store.md#make-mutations) method. If your mutations are created using the helper, then sub-property writes will be handled automatically.

If you've written your own mutations and you're using store accessors or component helpers then you'll need to manually handle the Payload class.

#### `Payload class`

The `Payload` class is passed to mutations from Pathify's accessor helpers when a path expression includes sub-property access. The class communicates the sub-property `path` and `value`, as well as encapsulating `update()` functionality, and checking for permission to write or even create sub-properties.

As mentioned, `make.mutations()` takes care of all sub-property writes automatically, but if you need to do it yourself, here's an example of manually creating a mutation function and what to do with the passed Payload:

```js
// store
import { Payload } from 'vuex-pathify'
import _ from 'lodash'

const state = {
  sort: {
    key: 'id',
    order: 'asc'
  }
}

const mutations = {
  // manually-created sort mutator
  SET_SORT: (state, payload) => {
    // debug
    console.log('payload', payload)

    // if we have a Payload, do something with it
    if (payload instanceof Payload) {
      
      // either, update using payload...
      state.sort = payload.update(state.sort)
      
      // ...or, update using dot-notation `path`
      _.set(state.sort, payload.path, payload.value)
    }
    
    // otherwise, handle normally
    else {
      state.sort = payload
    }
  }
}
```
```js
// global
store.set('sort@order', 'desc')
```



### Errors

 In the event that a supplied path does not map to a property, Pathify will let you know:

```js
// would map to `mutations.SET_FOO` or `actions.setFoo`
store.set('foo', false) 
```
```text
[Vuex Pathify] Unable to map path 'foo':
    - Did not find action 'setFoo' or mutation 'SET_FOO' on store
    - Use path 'foo!' to target store member directly
```

As a developer you can update the path or use any of the direct access methods above.