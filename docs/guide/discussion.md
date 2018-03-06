# Discussion

Whilst Vuex (especially with the Vue Dev Tools) makes state management easier, the required change in both thinking, architecture and coding is a cost that needs to be taken into account when planning a Vuex project.

Rather than bloat the actual documentation with this kind of discussion or explanation, I've opted to contain most of that here.

## Components

Wiring read/write component access with Vuex is a lot work.

Although the built-in helpers can help a little, generally:

- the store needs at least a `mutator` and potentially a `getter` and `action` for each property value
- to get a value from the store, you need to know whether it's implemented as a `getter` or simply `state`
- in either case, you need to use a different syntax to access it
- to store the value locally, you need a `computed` or `data` property
- to communicate any change from the component, you need either an explicit `@event` handler, a `v-model` or `.sync`
- to set a value on the store, you need to know whether to use a straight `commit()` or to `dispatch()` an action, and whether it needs a payload
- to manage the local get/set you need to build one or both of a `computed` property handler or `method`
- to implement the set, you need to pass the correct commit `path` or action `IDENTIFIER` along with a `value`
- if you need to do something afterwards, you need to provide a `thennable` function and do something there

Aside from the sheer amount of *code*, the main problem is the massive disparity between all the moving parts:

- you need to know the inner workings of the store to have any chance of completing the wiring
- getters, setters, commits and dispatches demand different approaches and parameters
- you have the choice to use computed properties, actions or watches to update the store

When your developmental requirement is simply a 1:1 mapping between a component and store, this is a depressingly *huge* amount of machinery, and a massive cognitive overhead, distracting you from actually *building* your app.



## Forum posts

Some of the workings out have been spurred by these conversations:

- 2017/10/11 - [.sync vs v-model](https://forum.vuejs.org/t/sync-vs-v-model/19380)
- 2017-09-26 - [Vuex mapGetters vs mapState](https://forum.vuejs.org/t/vuex-mapgetters-vs-mapstate/18447)
- 2017-08-24 - [Actions for actions’ sake?](https://forum.vuejs.org/t/actions-for-actions-sake/16413)
- 2017-08-22 - [Vuex commit + {root:true } vs store.commit](https://forum.vuejs.org/t/vuex-commit-root-true-vs-store-commit/16255)
- 2017-07-25 - [Calling non-existant Vuex root getters](https://forum.vuejs.org/t/calling-non-existant-vuex-root-getters/14738)
- 2017-07-17 - [Using Vuex with prop.sync](https://forum.vuejs.org/t/using-vuex-with-prop-sync/14430)
- 2017-07-13 - [Vuex …mapState syntax - why is it different from …mapActions?](https://forum.vuejs.org/t/solved-vuex-mapstate-syntax-why-is-it-different-from-mapactions/14257)
- 2017-07-01 - [Is it not weird to do input form input validation inside of a Vuex store?](https://forum.vuejs.org/t/is-it-not-weird-to-do-input-form-input-validation-inside-of-a-vuex-store/13567)


