# Component helpers

> Component helpers take the pain out of wiring

## Overview

Pathify component helpers are designed to **easily wire components** to the store.
 
They are **direct replacements** for Vuex `map*()` helpers, which wire:
 
- computed properties to state / getters
- methods to actions
- single or multiple members
- 1-way and 2-way data-bindings

Additionally, they support Pathify's rich [path syntax](api/paths) including: 

- sub-property access
- wildcards

Each helper generates and returns the appropriate `Function` handler or `Object` hash of handlers, which can be directly assigned or spread in as needed.

Note that although the **generation** is more expensive than writing a manual function, once helper has finished, only lightweight functions are returned and run.


## Usage

The following gives an example of some of the main features:

```js
import { get, sync, call } from 'vuex-pathify'

// component
export default {
  computed: {
    // read-only, single property
    items: get('products/items'),
    
    // read/write, single property
    search: sync('products/filters@search'),
    
    // read/write, rename, multiple (sub) properties
    ...sync('products/filters@sort', {
      sortOrder: 'order',
      sortKey: 'key',
    }),

    // read/write, multiple automatic properties
    ...sync('products/*')
  },
  
  methods: {
    // wire multiple actions
    ...call('products/*')
  }
}
```

See the component helpers [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify-demos/tree/master/main?initialpath=api/component) for an editable, live example.


## API

!> Remember that component helpers use Pathify's core [property access](/api/properties.md) so have exactly the same functionality.

### Single property access

#### `get(path: string): *`

Use `get()` to read properties from the store: 

```js
computed: {
  items: get('products/items')
}
```

The helper generates the following computed property:

```js
computed: {
  items () {
    return this.$store.getters['products/items']
  }
}
```

The function is analogous to a combination of `mapState()` and `mapGetters()`.

#### `sync(path: string): *`

Use `sync()` to set up two-way data binding: 

```js
computed: {
  items: sync('products/status')
}
```

The helper generates the following **compound** computed property:

```js
computed: {
  status: {
    get () { 
      return this.$store.state.products.status
    },
    set (value) {
      return this.$store.commit('products/SET_STATUS', value)
    },
  }
}
```

The function is analogous to a combination of `mapState()` and `mapMutations()`.

Note that `sync()` reads **only from state** to prevent a situation where a same-named [transformational getter](api/properties?id=accessor-priority) could end up recursively modifying the true value of state.

If you want to specify an alternate mutation or action, `sync()` takes an additional path syntax `|` with which you can specify direct access:

```js
computed: {
    // get with `items` accessor but set with `update()` action
    items: sync('items|update')
}
```

#### `call(path: string): *`

Use `call()` to create functions that dispatch actions to the store:

```js
methods: {
  load: call('products/load')
}
```

The helper generates the following method:

```js
methods: {
  load (payload) {
    return this.$store.dispatch('products/load', payload)
  }
}
```

The function is analogous to `mapActions()`.


### Multi-property access

Each of the component helpers can generate **multiple** members.

You can use:

- [array syntax](#array-syntax) - to map properties 1:1 with the store
- [object syntax](#object-syntax) - to map properties with different names on the component
- [wildcard expansion](#wildcard-expansion) - to grab sets of properties automatically

Each syntax generates an **Object** of **named properties** which must be mixed in to the associated block (`computed` or `methods`) or set as the block itself:

```js
computed: {
  ...sync(map),
  ...sync(path, map)
},
methods: {
  ...call(map),
  ...call(path, map)  
}
```
```js
computed: sync(path, map),
methods: call(path, map) 
```

#### `Array syntax`

Array syntax maps property names **identically** to the store.

It takes an **optional** `path` prefix, and an array of store `member` names:

```js
computed: {
  ...get('products', [
    'search',
    'items',
  ])
},
methods: {
  ...get('products', [
    'load',
    'update',
  ])
}
```
```paths
items  : products/items
filter : products/filter
load   : products/load()
update : products/update()
```

#### `Object syntax`

Object syntax maps property names **differently** to the store.

It takes an **optional** `path` prefix, and hash of `key:member` names:

```js
computed: {
  ...sync('products/filters@sort', { 
    sortOrder: 'order',
    sortKey: 'key',
  })
},
methods: {
  ...call('products', { 
    loadItems: 'load',
    updateItems: 'update',
  })
}
```
```paths
sortOrder   : products/filters@sort.order
sortKey     : products/filters@sort.key
loadItems   : products/load()
updateItems : products/update()
```


#### `Wildcard syntax`

Wildcard syntax maps **groups** of property names **identically** to the store.

```js
computed: {
  ...get('products/*')
},
methods: {
  ...call('products/*')
}
```
```paths
items    : products/items
search   : products/search
filters  : products/filters
load     : products/load()
update   : products/update()
```

Additionally, computed properties can target **any** set of state properties or sub-properties, so the following are all valid:

```wildcards
products/*
products/filters@*
products/filters@sort.*
```

Note that the path engine supports partial matches:

```js
methods: {
  ...call('products/*Items')
},
```

However, overuse of partial matching would indicate an over-complex design and the need for refactoring!

### Troubleshooting wildcards

Before you get all trigger-happy with wildcards and use them everywhere, there are a few things you should know.

The wildcard `*` symbol tells Pathify that it should grab object keys **below** the targeted path segment and generate handler functions for them.

Because the results of a wildcard path are determined **programmatically** the targeted store member **must exist** when the helper is run!

For example, at the point of calling `get('user/*')` a module called `user` must exist in the store:


```js
// components/User.js
export default {
  computed: {
    ...get('user/*') // `store.state.user` module MUST exist at this point
  }  
}
```

There are two main situations where this may not be the case:

1. when routes have been imported before the store
2. when using dynamically registered modules

Read below to find out more and how to mitigate these issues.

#### `Correct router setup`

It's easy to forget that components are imported when the routes are set up:

```js
import User from 'components/User'
export default [
  { path: 'user/:id', component: User }
]
```

This results in the component definition being loaded **and the code within being run**. If any component helpers have been called with wildcard paths, they'll query the requested state object, and if it **hasn't yet** been added to the store - Pathify will log an error:

```console
[Vuex Pathify] Unable to expand wildcard path 'user/*':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload
```

To solve this, simply import your store before your router so that properties are set up before being asked for:

```js
import store from './store'
import router from './router'
```

If you're using Nuxt and are still getting errors, make sure you haven't loaded any components that use Pathify and wildcards in any files in `/plugins` as these will load before Nuxt has a chance to load Vuex.


#### `Dynamic module registration`

Vuex has the ability to register modules [dynamically](https://vuex.vuejs.org/en/modules.html#dynamic-module-registration) rather than import them all when your project loads. Use cases for this might include: 

- a module that is used only in a subset of routes
- one component and potentially child-components need access to the same store
- a set of components might use copies of the same store

Let's take the first example, that a `user/` route requires a `user` store module to be loaded:

```js
// components/User.js
import user from 'store/user'

export default {
  beforeCreate () {
    this.$store.registerModule('user', user)
  },
  
  computed: get('user/*') // ERROR! `store.state.user` does not exist at this point!
}
```

The problem is that at the time of executing `get()` the `created()` lifecycle hook hasn't run.

To get round this, there are a few options:

1. **don't use wildcards** with dynamic modules
2. register the module in a **composing** component
3. register the module in a **global router** `beforeRouteEnter` hook
4. assign computed properties **programmatically** in the component `beforeCreate` hook

The first option is workable as it's self-contained and only a little more code. The next two options require additional architecture, so might not be workable. The forth option whilst straightforward, requires a not trivial amount of code to set up, as you need to account for a few edge cases.

As such, Pathify ships with a `registerModule` helper which you can read about below.

#### `registerModule()`

Pathify's `registerModule()` helper is designed to:

- register a store module via component `beforeCreate`
- add or extend the component's computed properties with new ones
- add or extend the component's methods with new ones
- unregister a store module via component `destroyed`

Its signature is similar to `Vuex.registerModule()` with the addition of a callback that should return new component blocks. It is implemented as a function which returns an object which can used as a base class or mixin.

Below is an example using the helper as a base class:

```js
// imports
import { get, call, registerModule } from 'vuex-pathify'
import module from './store/user'

// callback to return lazily-executed Pathify helpers
const members = function () {
  return {
    computed: get('user/*'),
    methods: call('user/*')
  }
}

/**
 * User component definition
 */
export default {
  // extend from generated base class
  extend: registerModule('user', module, members),
  
  // additional computed properties
  computed: {
    foo () { ... }
  },
  
  // additional methods
  methods: {
    bar () { ... }
  }
}
```

If you're interested to see what happens behind the scenes [check out the code](https://github.com/davestewart/vuex-pathify/blob/master/src/helpers/modules.js) on GitHub.
