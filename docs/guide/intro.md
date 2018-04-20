
# Pathify 101

> An overview of Pathify in less than 30 seconds

## Overview

Pathify **simplifies** Vuex wiring by abstracting its various syntaxes and methods to **a unified, state-based, path syntax**:

```
products/items@filters.search
```

All store interaction is then expressed in terms of `paths/to/properties` and `get()`, `set()` or `sync()`:

```js
// global
const items = store.get('products/items')

// component
computed: {
  items: sync('products/items')
}
```

[Configuration](/guide/mapping.md) and [accessor logic](/api/properties.md) factor   out decisions around `state`, `getters`, `commits` or `dispatches`:

```js
Pathify                                     Vuex
      
store.get('products/items')           <-    store.getters['products/items']
                                            store.state.products.items
store.set('products/items', items)    ->    dispatch('products/setItems', items)
                                            commit('products/SET_ITEMS', items)
```

The approach results in a significant simplification of Vuex's API:
 
- from **4** operations, **4** helpers, **3** accessor syntaxes and **3** naming formats
- to **3** methods and **1** path format


In store setup [store helpers](/api/store.md) eliminate store boilerplate:

```js
const mutations = make.mutations(state)
```

In app code [component helpers](/api/component.md) enable one-liner, multi-property wiring with transparent sub-property read and write:

```js
computed: {
  ...get('products/*'),
  ...sync('products/items@filters.search')
}
```

The Pathify [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo) shows a reduction in setup and wiring code between **2 and 15 times** (at least) depending on component size and Vuex setup.

## Summary

A final look at Pathify's core features:

- unified, state-based, path format
- simplified store member access
- transparent sub-property access
- one-liner component data-binding
- one-liner boilerplate generation
- massive reduction in lines of code

The bottom line: Pathify radically reduces store setup, wiring and cognitive overhead, leaving you more time and bandwidth to build today's complex front end apps.

