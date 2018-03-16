## Behind the scenes 

, creating the functions **you would have created manually**

### Decoupled by default

Because everything is a path, you don't need to worry about implementation.

A common practice when working with Vuex stores is to explicitly state your API by providing getters and actions for all states. This:

1. removes uncertainty when targeting the store from components
2. shields against implementation changes down the line

However, this approach creates a lot of extra boilerplate, bloats your stores, and makes more to keep track of.

Because Pathify takes responsibility for determining store members, your components no longer need to know your store's exact implementation, and developers no longer need to care .

Pathify programatically determines whether to read `state` or `getters`, or `commit` or `dispatch` and caches the result; all that is needed is the path to the associated state property.


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

### Automatic member resolution

So how does Pathify know how to convert a path such as `foo/bar` to the correct Vuex member such as `_actions['foo/setBar']` or `_mutations['foo/SET_BAR]`?

The answer, is a mixture of configuration and reflection:

1. Pathify uses user-configurable **resolver functions** to determine how to create a member name from a **prefix** (i.e., `set`) and **naming scheme** (`none`, `camelCase` or `CONST`).

2. This is then combined with the Pathify **operation** type (`get` or `set`), the **target** property (`foo`) and finally the relevant member **type** and **priority** (`getter` > `state` / `action` > `mutation`). 

3. All this information allows Pathify to target **existing** store members, or as in the helpers example, create **new** store members that match the current naming scheme

The table below illustrates the default **resolver** configuration with a **target** property of `foo/bar`:

| Operation | Priority | Type | Scheme | Prefix | Name | Member
| :-- | :-- | :-- | :-- | :-- | :-- | :-- |
| get | 1 | getters | none |  | foo | `state.foo.bar`
| get | 2 | state | none |  | foo | `getters['foo/bar']`
| set | 1 | actions | camel | set | setBar | `_actions['foo/setBar']`
| set | 2 | mutations | const | set | SET_BAR | `_mutations['foo/SET_BAR']`

Note that changing the resolver **prefix** and **scheme** would allow the user to name his/her store members differently from the defaults.

Either way, it's important that the members in the store **adhere to the chosen naming convention** if they wish to be targeted correctly by Pathify!

Note that if a targeted member does not exist, a warning will be thrown.


