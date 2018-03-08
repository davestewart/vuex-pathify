# Vuex Pathify

## Overview

Pathify provides intuitive `path/to/property` read + write access to Vuex stores.

<img src="https://cdn.vox-cdn.com/uploads/chorus_image/image/49494383/code.0.jpg" width="888" />

The package (+ helpers) solve several everyday Vuex issues:

- inconsistent interface for state, getters, mutations and actions
- store bloat resulting from "pass-through" mutations, getters and actions
- component bloat from 2-way component binding
- general code verbosity

In practical terms, Pathify makes for intuitive, consistent store access, leaner stores, and one-liner component wiring.


## Usage 

### Store access

You can pull values from the store using familiar path syntax:

```js
const items = store.get('products/items')
```

More powerfully, you can write to the store the same way:

```js
store.set('products/items', data)
```

You can even get copies of items:

```js
const copies = store.copy('products/items')
```

Pathify automatically determines whether to pull `state` or `getters`, or call `actions` or `mutations`.

See the [config]() section for more information.

### Deep property access

Use the `@` operator and dot-syntax to read or write sub properties:

```js
store.set('products/params@sort.order', 'ASC')
```

### Component helpers

Component helpers allow you to `get`, `set` and `sync` computed properties in one line: 

```js
computed: {
    filter: sync('products/filter'),
    results: get('products/items')
}
```

You can use `getSome` and `syncSome` to easily map multiple properties at once:

```js
computed: {
    ...getSome('products', [
        'items',
        'filter',
    ]),
}
``` 

Use the `object` format to change names, even read/write sub-keys:

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

Consider the following setup, where 3 mutations need to be written:

```js
const state = {
    foo: null
    bar: null,
    baz: null,
}
```

The `makeMutations` helper will create all required functions, including **deep-set** functionality:

```js
const mutations = makeMutations(state)
```

By hand, you would have had to manually write the following (without deep-set-ability):

```js
const mutations =
{
    SET_FOO: (state, value) => state.foo = value,
    SET_BAR: (state, value) => state.bar = value,
    SET_BAZ: (state, value) => state.baz = value,
}
```

The API docs offer additional information, including skipping properties, and mixing in additional functions. 

The package also includes `makeGetters` and `makeActions` helpers, though [their necessity is reduced]() due to Pathify's automatic member resolution.

### Member name resolution

Pathify maps intentions such as `set()` with paths such as `"foo/bar"` to target store members such as `SET_BAR`

It uses a simple **resolver function** to determine the naming for a target member:

```js
function resolve (type, name, formatters) {
  switch(type) {
    case 'mutations':
      return formatters.const('set', name) // SET_BAR
    case 'actions':
      return formatters.camel('set', name) // setBar
  }
  return name // bar
}
```

This function is [designed to be overridden](), so whatever your store-naming strategy, Pathify can work for you.


## Summary

Pathify abstracts repetitive and often complex Vuex wiring and boilerplate into elegant one-liners, providing a unified and intuitive interface to your Vuex stores.

It uses configuration and reflection to create the functions **you would have created anyway** (including decision-making, syntax juggling, automatic member resolution, and deep-setting) yet simplifies the resulting code and practically eliminates boilerplate.

Essentially, Pathify provides: 

- a simple and consistent path syntax
- transparent member resolution and execution
- additional superpowers, like deep property access
- no more bloated components or stores
- no more repetitious, complex wiring

Yet, it's all still Vuex.

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


