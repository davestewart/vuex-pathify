# Component helpers

> Component helpers take the pain out of wiring

## Overview

Pathify component helpers are designed to **easily wire components** to the store.

They are implemented as **helper functions** which can:
 
- **get**, **set** or **sync** values
- wire **single** or **multiple** properties
- be written as one-liners

Each helper builds and returns the appropriate `computed` property. Because get, set **and** sync are all **computed properties**, there's no need to add functions or map actions/mutations in the `methods` block.

## Usage

The following gives an example of some of the main features:

```js
import { get, set, sync } from 'vuex-pathify'

// component
export default {
  computed: {
    // read-only, single property
    items: get('products/items'),
    
    // read-only, direct-access single property
    ...get('products/filteredItems!'),
    
    // read/write, single property
    search: sync('products/search'),
    
    // read/write, multiple (sub)properties
    ...sync('products/filters@sort', {
      sortOrder: 'order',
      sortKey: 'key',
    }),

    // wildcard syntax
    ...sync('products/*')
  }
}
```

See the [interactive demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/develop/demo?initialpath=api/component) for live examples.


## API

!> The examples on this page use the [example](/resources/setup) setup and the [standard](/guide/mapping.md) mapping scheme

### Single property access

Remember that component helpers use Pathify's core [property access](/api/properties.md) so have exactly the same functionality.

#### `sync(path: string): *`

Use `sync()` to set up two-way data binding: 

```js
computed: {
  items: sync('products/items')
}
```

The helper generates the following **compound** computed property:

```js
computed: {
  items: {
    get () { 
      return this.$store.getters['products/items']
    },
    set (value) {
      return this.$store.commit('products/SET_ITEMS', value)
    },
  }
}
```
Note that `sync()` takes an additional path syntax `|` with which you can specify direct access for both get and set members:

```js
computed: {
    // get with `items` accessor but set with `updateItems()` action
    items: sync('items|updateItems!')

    // get with `filteredItems` getter and set with `updateItems()` action
    items: sync('filteredItems!|updateItems!')
}
```

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

#### `set(path: string, value: *): *`

Not so useful on its own, but included for completeness, use `set()` to write properties to the store: 

```js
computed: {
  items: set('products/items')
}
```

The helper generates the following computed property:

```js
computed: {
  items (value) {
    return this.$store.commit('products/SET_ITEMS', value)
  }
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
    'items',
    'filter',
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
