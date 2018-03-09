# Vuex Pathify

## Overview

Pathify provides a unified and intuitive path interface to Vuex stores.

![image](https://user-images.githubusercontent.com/132681/37185793-140d5470-233a-11e8-937b-efbd623a97ab.png)

The plugin aims to solve several everyday Vuex issues:

- inconsistent interface for state, getters, mutations and actions
- boundary issues with components required to know store implementation
- store bloat due to "pass-through" getters, mutations and actions
- component bloat due to two-way data binding setup
- general Vuex-related code verbosity

In practical terms, Pathify results in zero store boilerplate, one-liner wiring and overall cleaner code.


## Usage 

### Store access

You can read store values using familiar path syntax:

```js
const items = store.get('products/items')
```

More powerfully, you can write to the store the same way:

```js
store.set('products/items', data)
```

As everything is a path, there's no need for syntax juggling:

```js
// TODO use Pathify!
store.state.products.items
store.getters['products/items']
store.commit('products/SET_ITEMS', data)
store.dispatch('products/setItems', data)
```

Pathify is [configured]() for the most common naming scheme, but it's simple to reconfigure. 

### Sub-property access

Use Pathify's `@property` syntax to read or write store sub-properties:

```js
store.set('products/params@sort.order', 'ASC')
```

The ability to reach into objects makes things like search filters a snap:

```js
const state = {
    items: [ ... ],
    params: {
        search: '',
        filters: {
            budget: null,
            color: null,
            size: null
        },
        sort: {
            key: 'id',
            order: 'ASC'
        }
    }
}
```

### Component helpers

Component helpers take the pain out of wiring.

Use `get()` to read `getters` or `state` directly: 

```js
computed: {
    results: get('products/items')
}
```

More powerfully, use `sync()` for effortless two-way data binding: 

```js
computed: {
    filter: sync('products/filter'),
}
```

No `get/set` object block, no `state/getter` or `commit/dispatch` juggling, no `...mapState` here and `...mapMutations` there; everything's handled automatically, in one place, in one easy-to-read line.

Use `getSome` and `syncSome` to map multiple properties at once:

```js
computed: {
    ...getSome('products', [
        'items',
        'filter',
    ]),
}
``` 

Use the `object` format to change key kames or map sub-properties:

```js
computed: {
    ...syncSome('products/sort', {
        sortOrder: '@order'
        sortKey: '@key'
    })
}
``` 

### Store helpers

Store helpers exist to remove boilerplate.

Consider even a basic setup with 3 top-level state items:

```js
const state = {
    foo: null
    bar: null,
    baz: null,
}
```

Whilst you're thinking about manually writing the mutations, Pathify's already done it:

```js
const mutations = makeMutations(state)
```
```js
// result
{
    SET_FOO: (state, value) => value instanceof Payload
        ? value.update(state)
        : state.foo = value,
    SET_BAR: (state, value) => value instanceof Payload
        ? value.update(state)
        : state.bar = value,
    SET_BAZ: (state, value) => value instanceof Payload
        ? value.update(state)
        : state.baz = value,
}
```

Note the (configurable) **naming** and **sub-property access** (for free).

The package also includes `makeGetters` and `makeActions` for those who still want or need explicit wiring (hint: you probably don't).


## Summary

Pathify provides a unified and intuitive path interface to your Vuex stores.

It uses configuration and reflection to abstract complex wiring into elegant one-liners, whilst keeping store implementation details out of your components.

It offers a significant reduction or even total removal of boilerplate, resulting in cleaner, leaner stores and easy-to-read components.

Finally it provides transparent sub-property access, making it simple to manage complex values.

Yet, it's all still Vuex!

## Next steps

Check out the demo:

- Demo

Get started:

- Installation
- Configuration

The API:

- Store access
- Store helpers
- Component helpers

Background:

- Best practices
- Code comparisons
- How it works
- Rationale


