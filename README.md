# Vuex Pathify

> Vue / Vuex plugin providing a unified path syntax to Vuex stores

## Overview

Vuex Pathify is a Vuex plugin that provides a familiar, consistent and powerful read/write path access to your Vuex stores.

### Store access

You can pull items from the store using simple path syntax:

```js
const items = store.get('products/items')
```

More powerfully, you can write to the store using the same syntax:

```js
store.set('products/items', data)
```

### Deep property access

You can use the `@` operator to read or write sub properties:

```js
store.set('products/sort@order', 'ASC')
```

(See `makeMutations` further down the page for more info)

### Component helpers

Component helpers allow you to get, set and sync computed properties in one line: 

```js
computed: {
    results: get('products/items'),
    filter: sync('products/filter')
}
```

Easily map multiple properties at once, change names, even read/write sub-keys:

```js
computed: {
    ...syncSome('products/sort', {
        sortOrder: '@order'
        sortKey: '@key'
    })
}
``` 

### Store helpers

Store helpers remove the need to create endless store boilerplate. Rather than write tedious and repetitive `mutations` by hand, have Pathify convert your state into functions for you:

```js
const state = {
    foo: null
    bar: null,
    baz: null,
}
```
```js
const mutations = makeMutations(state) // can also filter keys
```
```
{
    SET_FOO: (state, value) => state.foo = value,
    SET_BAR: (state, value) => state.bar = value,
    SET_BAZ: (state, value) => state.baz = value,
}
```

The associated helpers also exist for `getters` and `actions` but with Pathify's automatic member resolution, there isn't much need to.


## Pathify deep dive

### Automatic member resolution

Behind the scenes, Pathify determines which `getter`, `mutation` or `dispatch` type to use based on your pre-configured naming scheme:


| Type | Scheme | Prefix | Property |
| :-- | :-- | :-- | :-- |
| getters | none |  | items |
| actions | camel | set | setItems |
| mutations | const | set | SET_ITEMS |

This allows Pathify to target **existing** store members, or as in the helpers example, create **new** store members that match the current naming scheme.

### Automatic state / getter resolution

One of Pathify's design choices is to automatically determine whether to pull from the `state` or `getters`.

In the following example, Pathify prefers the declared `getter` over the identically-named `state` and so returns an array of `ItemModels`.

This setup allows the state to be the "single source of truth" and the getter to be the "transformer" function:


```js
const state = {
    items: [ ... ]
}

const getters = {
    items: state => state.items.map(item => new ItemModel(item))
}
``` 
```
const models = store.get('products/items')
```

The same resolution between `actions` and `mutations` is also applied when **setting** values; this is covered in more details in the API docs.


## Summary

Pathify provides a simple, consistent and powerful facade for Vuex store access, enabling a significant reduction in boilerplate and an increase in code clarity. 

Essentially: 

- A simple, consistent, and powerful path syntax
- Less requirement for `commit` / `dispatch`
- Less requirement for module `state` / `getter` syntax juggling
- No more bloated store setup
- No more bloated component files
- No more manual wiring

Finally, Pathify is not meant to **completely** replace manual use of `commit` / `dispatch` rather it is supposed to be used where it makes sense:

- Use Pathify `get`, `set` and `sync` for component data access
- Use Vuex `dispatch` for asynchronous operations
- Use Vuex `commit` inside actions 



## Setup

#### Main

Import the plugin, your modules, then set up your Vuex store with the Superstore `save()` and `load()` methods:


```js
import Vuex from 'vuex'
import pathify from 'vuex-pathify'

const store = new Vuex.Store({

  plugins: [ pathify.plugin ],
  
  state,
  mutations,
  actions,
  getters,

  modules {
    ...
  },
})
```

#### Components / stores

To use the helpers in components and stores, import and use them as required:

```
// store
import { makeMutations, makeGetters, makeActions } from 'vuex-pathify
```
```
// components
import { get, set, sync, getSome, syncSome } from 'vuex-pathify
```

Additionally, `commit` and `dispatch` are included for importing convenience for when you don't want to (or can't) use automatic member resolution:

```
// components
import { commit, dispatch } from 'vuex-pathify
```

