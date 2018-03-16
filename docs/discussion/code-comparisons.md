# Code comparisons

### Syntax juggling

```js
// TODO use Pathify!
store.state.products.items
store.getters['products/items']
store.commit('products/SET_ITEMS', data)
store.dispatch('products/setItems', data)
```


| type | code 
| --- | --- 
| state | store.state.products.items
| getters | store.getters['products/items']
| mutations | store.commit('products/SET_ITEMS', data)
| actions | store.dispatch('products/setItems', data)


### Automatic API mapping

As everything is a path ...

```js
path          => 'products/items'
```

... there's no need for [syntax juggling](docs/discussion/code-comparisons.md#syntax-juggling); Pathify maps strings to store members automatically:

```
state         => store.state.products.items
getters       => store.getters['products/items']
mutations     => store.commit('products/SET_ITEMS', data)
actions       => store.dispatch('products/setItems', data)
```


You can opt out of automatic mapping by passing the **actual** store member name and appending a bang `!` to the path:

```js
store.set('INCREMENT!', data) // commit('INCREMENT', data)
```

See the [How it works](docs/discussion/how-it-works.md) section for more info. 



### Store setup

A significant proportion of Vuex setup is **wiring**; fairly redundant "pass-through" methods that exist only to provide a public API.


makeMutations vs manual mutations

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

Note the (configurable) automatic **naming** and **sub-property access** (for free).



### Computed properties

Note:

- no complex `get/set` object block
- no knowledge of whether it's `state/getter` or `commit/dispatch`
- no `...mapState` here and an extra `...mapMutations` in methods

Everything's handled automatically, in one place, in one easy-to-read line.


2-way component property

- https://vuex.vuejs.org/en/forms.html#two-way-computed-property

Committing mutations in components

- https://vuex.vuejs.org/en/mutations.html#committing-mutations-in-components

### Sub-property access

