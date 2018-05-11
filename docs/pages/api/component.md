# Component helpers

> Component helpers take the pain out of wiring

## Overview

Pathify component helpers are designed to **easily wire components** to the store.

They are implemented as **helper functions** which:
 
- support **1-way** or **2-way** data-binding
- wire **single** or **multiple** properties
- are written as one-liners

Each helper generates and returns the appropriate `computed` property function. Additionally, because **sync** does everything inside a single **compound** computed property, there's no need to add code or map actions in your component's `methods` block.

Note that although the **generation** is more expensive than writing a manual function, once helper has finished, only lightweight functions are returned and run.


## Usage

The following gives an example of some of the main features:

```js
import { get, sync } from 'vuex-pathify'

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

Note that `sync()` takes an additional path syntax `|` with which you can specify direct access for both get and set members:

```js
computed: {
    // get with `items` accessor but set with `updateItems()` action
    items: sync('items|updateItems')
}
```

### Multi-property access

Each of the component helpers can generate **multiple** property wirings.

You can use:

- [array syntax](#array-syntax) - to map properties 1:1 with the store
- [object syntax](#object-syntax) - to map properties with different names on the component
- [wildcard syntax](#wildcard-property-access) - to grab sets of properties automatically

Each syntax generates an **Object** of **named properties** which must be mixed in to the computed property block, or set as the block itself:

```js
computed: {
  ...sync(map),
  ...sync(path, map)
}
```
```js
computed: sync(path, map) 
```

#### `Array syntax`

Array syntax maps property names **identically** to the store.

It takes an **optional** path prefix, and an array of `property` names:

```js
computed: {
  ...get('products', [
    'search',
    'items',
  ]),
}
```
```paths
items  : products/items
filter : products/filter
```

#### `Object syntax`

Object syntax maps property names **differently** to the store.

It takes an **optional** path prefix, and hash of `key:property` names:

```js
computed: {
  ...sync('products/filters@sort', { 
    sortOrder: 'order'
    sortKey: 'key'
  })
}
```
```paths
sortOrder : products/filters@sort.order
sortKey   : products/filters@sort.key
```

### Wildcard property access

!> Technically wildcard property access is "multi-property access" but gets its own section as there are a few things to be aware of before diving in and using it everywhere

#### `Wildcard syntax`

Wildcard syntax maps **groups** of property names **identically** to the store.

```js
computed: {
  ...get('products/*')
}
```
```paths
items    : products/items
search   : products/search
filters  : products/filters
```

Note that you can use wildcards to target **any** set of state properties or sub properties, so the following are all valid:

```wildcards
products/*
products/filters@*
products/filters@sort.*
```

Note that the `*` symbol must be placed at the end of all paths!

#### `Understanding why wildcard properties work`

The wildcard `*` symbol tells Pathify that it should grab all object keys **below** the targeted path segment and generate computed property functions for them.

To do this, the targeted state object **must exist** when the helper is run! That is, at the point of calling `get()` or `sync()` you must be sure that the targeted **store property or module** has been **loaded or registered**:


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

#### `Import order matters`

It's easy to forget that components are imported when the routes are set up:

```js
import User from 'components/User'

export default [
  { path: 'user/:id', component: User }
]
```

This results in the component definition being loaded **and the code within being run**. If any computed property helpers have been called with wildcard paths, they'll ask the store for the requested state object, and if it **hasn't yet** been added to the store - Pathify will log an error:

```console
[Vuex Pathify] Unable to create computed properties for path 'user/*':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload
```

To solve this, simply import your store before your router so that properties are set up before being asked for:

```js
import store from './store'
import router from './router'
```


#### `Dynamic module registration`

Vuex has the ability to register modules [dynamically](https://vuex.vuejs.org/en/modules.html#dynamic-module-registration) rather than import them all when your project loads.

This would prevent us using wildcards if state wouldn't exist by the time the computed properties were asked for:

```js
// components/User.js
import store from 'store'
import user from 'store/user'

export default {
  beforeCreate () {
    store.registerModule('user', user)
  },
  
  computed: get('user/*') // ERROR! `store.state.user` does not exist
}
```

Luckily, there's a way to add computed properties manually by directly modifying the component's `$options` hash.

This allows us to load the component, register the module, add computed properties, then have it all cleaned up when we destroy the component too:

```js
// components/User.js
import store from 'store'
import user from 'store/user'

export default {
  beforeCreate () {
    store.registerModule('user', user)
    Object.assign(this.$options.computed, get('user/*'))
  },
  
  destoyed () {
    store.unregisterModule('user')
  }
}
```

Note that in development, hot-reloading can cause the computed properties to be forgotten, therefore an alternative setup is to use router hooks:

```js
// components/User.js
import store from 'store'
import user from 'store/user'

export default {
  beforeRouteEnter (to, from, next) {
    store.registerModule('user', user)
    next() // load the component last!
  },

  beforeCreate () {
    Object.assign(this.$options.computed, get('user/*'))
  },

  beforeRouteLeave (to, from , next) {
    next() // destroy the component first!
    store.unregisterModule('user')
  },
}
```

If none of these options are workable... just don't use wildcards :)