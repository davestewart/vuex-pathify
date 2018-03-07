# API

API reference for Vuex Superstore.

- #### Helpers

    - **[Store](store)** - used in store setup to reduce boilerplate
        - `makeMutations()`
        - `makeActions()`
        - `makeGetters()`
        - `aliasState()`
        - `aliasMutations()`

    - **[Component](component)** - used in components to reduce repetition and wiringstore.md
        - `get()`
        - `set()`
        - `sync()`
        - `getSome()`
        - `syncSome()`

- #### Plugins

    - **[Initial State](initial)** - called on the store to manage / retrieve initial state
        - `store.initial()`
        - `store.reset()`
        - `<module>.reset()`
        - `<module>.created()`

    - **[Accessors](accessors)** - called on the store to directly set or get properties
        - `store.set()`
        - `store.get()`
        - `store.copy()`

    - **[Persist](persist)** - declared in modules to persist them to local storage
        - `<module>.save()`

- #### Config

    - **[Settings](settings)** - configure Superstore to your way of working



