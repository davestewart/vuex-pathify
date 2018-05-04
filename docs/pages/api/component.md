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

See the component helpers [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo?initialpath=api/component) for an editable, live example.


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
- [wildcard syntax](#wildcard-syntax) - to grab sets of properties automatically

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

#### `Wildcard syntax`

Wildcard syntax maps **groups** of property names **identically** to the store.

```js
computed: {
  ...sync('products/*')
}
```
```paths
items    : products/items
category : products/category
filters  : products/filters
```

Note that you can use wildcards to target **any** set of state properties or sub properties, so the following are all valid:

```wildcards
products/*
products/filters@*
products/filters@sort.*
```

Also note that Pathify thet the wildcard `*` symbol **must be at the end** of the path!

!> **Important: import order matters!**

Using wildcard syntax has one caveat - you need to import your store before your router so that properties are set up before being asked for:

```js
import store from './store'
import router from './router'
```

If you don't do this, Pathify will warn you:

````
[Vuex Pathify] Unable to create computed properties for path 'foo/*':
    - The usual reason for this is that the router was set up before the store
    - Make sure the store is imported before the router, then reload
````

