# Component helpers

> Component helpers take the pain out of wiring

## Overview

Pathify component helpers are designed to **easily wire components** to the store using the same [path syntax](/api/paths) and [functionality](/api/accessors.md#methods) used throughout Pathify.

They are implemented as **helper functions** which can:
 
- **get**, **set** or **sync** values
- wire **single** or **multiple** properties
- be written as one-liners

Each helper builds and returns the appropriate computed property. The created **compound** computed property keeps all functionality within the `computed` block, so no need for actions or additional helpers.

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
  }
}
```

## API

!> The examples on this page use the [example](/resources/setup) setup and the [standard](/guide/mapping.md) mapping scheme

### Single property access


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

All the component helpers have an **alternate syntax** which generate **multiple** property wirings.

You can use:

- [array syntax](#array-syntax) - to map properties 1:1 with the store
- [object syntax](#object-syntax) - to map properties with different names on the component
- [wildcard syntax](#wildcard-syntax) - to grab sets of properties automatically

The differing syntaxes have the same outcome; they transform a single or compound input into **multiple paths**, each of which are then passed through the executed helper. The return result is **always** an Object which must be mixed in to the computed property block, or set as the block itself:

```js
computed: {
  ...sync(path, map)
}
```
```js
computed: sync(path, map) 
```

For Array and Object syntaxes, where an **optional string** may be passed before the **map parameter**, the two parameters are **intelligently concatenated**, attempting to transparently handles differing path syntax:

```js
computed: {
  ...get('products/filters@', [
    'search', 
    'sort.order'
  ])  
}
```
```paths
search : products/filters@search
order  : products/filters@sort.order
```

You can be reasonably creative with how you specify the component parts!

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
  ...sync('products/filters@', { 
    sortOrder: 'sort.order'
    sortKey: 'sort.key'
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

Note that you can use wildcards to target **any** set of state properties or sub properties, so the following syntaxes would be valid:

```wildcards
products/*
products/filters@*
products/filters@sort.*
```

## Utility syntax

As mentioned on the paths page, there are two [utility syntaxes](/api/paths.md#utility-syntax), one of which is specific to computed property helpers.


#### `Direct member access`

The first, is [direct member access](/api/paths.md#direct-member-access) which allows you access store properties directly, without any mapping.

To do this, reference the property name and append a bang `!`:

```js
computed: {
  items: get('products/filteredItems!')
}
```

Pathify will create a computed property that references the store member directly.

#### `Two-way mapping override`

The second, is two-way mapping override, which allows direct access in sync modifiers for one or both members.

To do this, reference the property names with a pipe `|` character between them:

```js
computed: {
  items: sync('products/filteredItems!|updateItems!')
}
```

Pathify will create a computed property that references both store members directly.
