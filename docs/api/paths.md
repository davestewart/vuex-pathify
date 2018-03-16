# Path syntax

> Store accessors provide root read / write access to the store

## Overview

The main plugin adds methods directly to the Vuex store instance, making it easy to get and set values from anywhere:


## Methods

#### `store.get(path, ...args)`

Gets a value from the store

#### `store.set(path, value)`

Sets a value on the store

#### `store.copy(path)`



```
store.set('item', value)
```

```text
[Vuex Pathify] Unable to resolve path 'item':
    - Did not find action 'setItem' or mutation 'SET_ITEM' on store
    - Use path 'item!' to target store member directly
```

```
store.set('item!', value)
```
