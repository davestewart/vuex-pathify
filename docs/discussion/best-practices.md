# Best practices

> Pathify and Vuex tips and tricks to ramp up your productivity

### What is Pathify good at?

Getting data
Syncing data
Syncing data

In what situations would Pathify not be able to resolve names?

## Strategies

    Decide on your project-wide Vuex strategies
    
    naming
        all the same
        state, SET_STATE
    access
        use 
        only getters and actions?
        
    Decide on your Superstore strategy
        Use paths (state, getters, mutations) for data
        Use actions for operations
        
#### Don't use Pathify sub-property access as a crutch

Don't put everything in one property, then use pathify to acesss sub properties, as your application logic will become unclear.

#### Is there a need for an operator to NOT use automatic name resolution?

Maybe when you have SET_ but you also need add?

commit('items/ADD_ITEM')

Not much point really, as you know what it is, so no point running more code

** Might be worth adding a dmo to show using sync() and commit() in the same file **


## Pathify or Vuex

Note that although Pathify removes the burden of setup and wiring, there will still be times when you want to access the store explicitly.

Ideally, you should:

- use Pathify `get`, `set` and `sync` for component / store data sync
- use Vuex `dispatch` for explicit asynchronous operations
- use Vuex `commit` for custom commits, or commits **within** the store
- use direct `state` / `getter` access where you need to be explicit


#### Should I still use the Vuex helpers?

You can, but it's probably easier to just use `getSome()`

#### Can I use mapActions?

Map Actions is useful, so it's been mixed in to Vuex Helpers so your imports are tidier

#### Do I still use commit and dispatch?

With `set()` now being the primary way to set values on the store, `commit()` is not so useful.

However, `dispatch()` is still useful in the fact it's explicit.

You could of course use `set()` to call actions as well.


## Store setup

#### Should I always go through getters and actions?

They are included mainly for developers who feel more comfortable accessing everything through [getters and actions](https://forum.vuejs.org/t/actions-for-actions-sake/16413)




## Performance

## Debugging

#### How much complication is in generated helper functions?

None. After the members have been found, the references are concrete

#### Does Pathify make it harder to debug?

Pathify abstracts the mechanism to target store members, then returns lightweight functions that 

Parameters vs data

## 
Where to clean code



### Automatic state / getter resolution

One of Pathify's design choices is to automatically determine whether to pull from the `state` or `getters`.

In the following example, Pathify prefers the declared `getter` over the identically-named `state` and so returns an array of `ItemModels`.

This setup allows the state to be the "single source of truth" and the getter to be the "transformer" function:


```js
const state = {
    items: [ ... ]
}

const getters = {
    items: state => state.items.map(item => new ItemModel(item))
}
``` 
```
const models = store.get('products/items')
```

The same resolution between `actions` and `mutations` is also applied when **setting** values; this is covered in more details in the API docs.

### Same-named store members



For example, naming `state`, `getters` and `mutation` **identically** and :

```js
const store = {
    foo: [],
    bar: true,
    baz: 'hello',
}

// foo is foo, bar is bar, etc
const mutations = {
    foo: (state, value) => foo = value,
    bar: (state, value) => bar = value,
    baz: (state, value) => baz = value,
}

// this identical foo getter will override foo state
const getters = {
    foo: state => foo.items.map(foo => new FooModel(foo))
} 
```