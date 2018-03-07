# Component helpers


## Overview

The package's Component Helpers `get()` and `sync()` are designed to **completely** solve these problems.

They allow you to connect components directly to Vuex via computed properties, with a variety of intentions, outcomes, targets and code styles:

- **intentions**: get or sync values
- **outcomes**: use getters or states, actions or commits
- **targets**: sync separate getter and setter paths, and target modules or sub-properties
- **styles**: use string, object, or array styles

Internally, are designed to **completely** :
 
- automatically determining store architecture
- automatically building the correct wiring
- being implemented only as computed properties
- using only a common path format

### Usage

A typical use case for using Vuex helpers would be to wire some UI directly to Vuex.

Let's start with the parent component, which contains two UI components:

```html
<div class="parameters">
  <h2>Product Options</h2>
  <dropdown 
    v-model="product" 
    label="Product"
    :options="options" 
  ></slider>
  <slider 
    v-model="amount" 
    label="Amount"
    :min="min" :max="max" 
  ></slider>
</div>
```

The parent component's computed properties track the Vuex store:

```js
computed: {
  product: sync('parameters/product'),
  amount: sync('parameters/amount')
}
```

The Vuex store contains the values we want to sync:

```js
state = {
  product: 'cars',
  amount: 100
}
mutations = {
  // code not shown
}
```

Working from the parent component down, you can see:

- two custom components
- each with a `v-model` attribute
- each referencing a `computed` property
- each connected to Vuex via `sync()`
- each referencing a `path` to a module sub-property

So a read-write connection to your Vuex store is as simple as wiring up the component with `v-model` and `computed` properties.
 
### How it works

Both `get()` and `sync()` perform similar tasks, which is to return a standard Vue [computed property](https://vuejs.org/v2/guide/computed.html) which abstracts the fairly mundane wiring of getters, state, actions or mutations.

For each usage, they:

- determine a path to a store member (object or function)
- if getting, whether to reference a `getter` or `state` key
- if setting, whether to `dispatch()` an action or `commit()` a mutation
- if syncing, then both!

The return value from each depends if access is read or read/write: 

- `get()` returns a single function
- `sync()` returns an object with `get` and `set` keys, each of which is a function

As long as the path you pass in to the helper translates to **actual store members**, everything just works!


### Setting and getting properties

Both `get()` and `sync()` have a variety of ways they can be implemented, which will be covered below.

#### 1-way sync

To create a read-only connection to Vuex, use the `get()` helper:

```js
computed: {
  bar: get('foo/bar')
}
```

Accessing `bar` will read from the `foo` module, pulling `bar` from a **getter** if it finds one, or the **state** if it doesn't.


#### 2-way sync

To create a read/write connection to Vuex, use the `sync()` helper:

```js
computed: {
  bar: sync('foo/bar')
}
```

The getter works the same way as before.

The setter looks first for a `bar` **action**, and if it doesn't find one, uses a **mutation**.

The decision to `dispatch()` an action or `commit()` a mutation is determined by the returned helper function (depending on what exists in the store), with the name of the path being used as the payload `type` and the passed value as the payload `value`.


#### 2-way sync with custom setter / action

By default, `sync()` expects getters and setters to be named the same, but for clarity in your store you may want to name them differently.

The following example uses a named getter and action:

```js
computed: {
  bar: sync('foo/bar', 'foo/setBar')
}
```

In this case, the store should have a `setBar()` action, and the helper will check for its existance and use it instead of searching for a `bar` mutation.


#### Getting or setting store sub-properties

In some cases, store properties may be stored as objects:

```js
state = {
  items: {
    product: 'cars',
    amount: 100
  }
}
getters = {
  items: state => state.items
}
```

Support for sub-properties is built-in, so in such a case you simply address the property by path and values will be returned, or a customised payload will be passed to to any action or mutation.

To get a property is straightforward:

```js
computed: {
  amount: sync('parameters/items/amount')
}
```

Internally, the helper first gets the `items` property, then walks down the remaining path segments as keys to return the property.

If you find the path notation to be too implicit, feel free to use dot notation:

```js
sync('parameters/items.amount')
```

To set a property takes requires your actions or mutations to receive properties in a certain way.

For actions, the `key` and `value` will be passed as *arguments*:

```js
actions = {
  amount ({commit}, key, value) {
    commit(key, value)
  }
}
```

For mutations, the `key` and `value` will included in the *payload*, so you'll need to deconstruct them:

```js
mutations = {
  items: function (state, {key, value}) {
    state.items[key] = value
    return state
  } 
}
```

Where your target is a deeply-nested property, `key` will be a path, and you'll need to use a library like lodash to [set properties](https://lodash.com/docs/4.17.4#set):

```js
mutations = {
  items: function (state, {key, value}) {
    _.set(state.items, key, value)
    return state
  } 
}
```

### Target multiple module properties

The core Vuex helpers provide functionality to target multiple module properties at once, and this package does the same.

Rather than do this:

```js
computed: {
  product: sync('parameters/items/product'),
  amount: sync('parameters/items/amount')
}
```

You can do this:

```js
computed: {
  ...sync('parameters/items', {
    product: 'product',
    amount: 'amount'
  })
}
```

This returns a 1:1 mapping as per the previous example, so needs to be "spread" into the computed properties.

As both keys and properties are the same, this can be simplified further to just an array:

```js
computed: {
  ...sync('parameters/items', ['product', 'amount'])
}
```

#### Handling differently-named mutations
 
But what if you want to provide custom getters and setters as per the earlier examples:

```js
computed: {
  product: sync('parameters/items/product|SET_PRODUCT')
}
```

Well, you'll need to use the `object` form of the call, with a special pipe `|` syntax to differentiate getters and setters:

```js
computed: {
  ...sync('parameters/items', {
    product: 'product|SET_PRODUCT',
    amount: 'amount|SET_AMOUNT'
  })
}
```


