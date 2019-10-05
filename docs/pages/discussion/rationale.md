# Rationale

> “If something can be easy, why make it hard?” - Evan You

## Overview

Why was Pathify created?

The rationale behind creating Pathify is that **Vuex is great** but the coding experience is **way too complex** for something as simple as **setting and getting values** on what is essentially a global object.

Managing state should not feel like an episode of [American Ninja Warrior](https://www.youtube.com/watch?v=TPa8whN2q60). We should not need to be constantly checking the manual for syntax or caveats, writing reams of redundant code, or fretting over which "best practice" will protect us from ourselves long enough to make an app that functions in the real world.

With that being said, Vuex is the Vue **state management standard**, has great tooling and online support, so we want to work with it rather than coming up with a new solution that no-one knows or cares about.

## The brief

### Pain points

The first thing to look at was, where are the pain points with setting and getting data in Vuex?

Which ones can be solved, which ones seem to be mantra over practicality, and which ones do we just have to live with?

- Lots of store boilerplate

    - every property needing to be explicitly created 
    - every property needs at least a state and mutation, and potentially a getter and action
    - unsure whether to create getters for all states, or not
    - when should actions be created and when to use only mutations ?

- Component wiring

    - many competing and cumbersome component wiring choices
    - 4 Vuex helpers to choose from
    - why do we have to map state AND getters ?
    - when and where to use "mapMutations" vs "mapActions" ?
    - helpers needed in computed and methods
    
- Things that are hard but feel like they shouldn't be

    - overall setup
    - working with object sub-properties
    - choosing between similar store members (i.e. state & getters)

- Inconsistency

    - In stores, why `items`, `setItems` and `SET_ITEMS` ?
    - In components, why:
        - `store.state.module.value` and `store.getters['module/value']`
        - `commit('module/SET_VALUE')` and `dispatch('module/setValue')` 

- Varying advice on "best" practices

    - it's "bad practice" to use mutations in components
    - you should use "getters and actions" not "state and mutations"
    - should you write commits as `CONST_CASE` or `camelCase` ?

- Verbose setup
    - storing different accessor types in separate files
    - creating static consts for all store member references
    - using dynamic object keys e.g. `[mutations.SET_ITEMS]: function () { ... }` to create properties
    
- Esoteric terms and concepts

    - why "mutation", "commit", "dispatch" ?
    - why "getters" but then "mutations"
    - when to use actions and when mutations ?
    - when to use getters and when state ?
    
The above points seem to fall into the following categories:

- **experience** - some of these points become clearer as you get to know Vuex
- **architecture** - some points are concerned simply with Vuex's architectural choices (good or bad)
- **best practice** - seemingly "best" practices seem to exist to protect the developer against the code itself
- **personal preference** - some of these points will depend on yours or your team's developmental preferences

In the next section we'll discuss which of these can be mitigated against, but for now, let's see what we both need and want to do with Vuex...

### Everyday Vuex

The second thing to look at is, what are the general tasks we do with Vuex on a day to day basis?

What do we need a proposed solution to actively support, or at least not get in the way of?

- Writing boilerplate:

    - setting up mutations for all states
    - potentially, setting up getters and actions
    - wiring one-way getters for component properties, either:
        - manually, by writing functions and accessing state and/or getters
        - automatically, using mapState and mapGetters
    - setting up two way wiring for component controls, either:
        - manually, by writing compound computed properties
        - semi-automatically, using
            - a combination of @event handlers
            - mapState / mapGetters
            - mapMutations / mapActions

- General access

    - getting values from state or getters
    - setting values using commits or dispatches
    - calling actions using dispatches
    
- State management

    - managing copies and part copies, for forms, or other compound components
    - managing grouped options, such as sorting, search, etc
    

### Ideal solution

What would the ideal Vuex experience look like ?

- Baseline happy:

    - not have to juggle JavaScript syntax or Vuex naming formats
    - not have to think about which store member data comes from or has to go to
    - set and get data without constant hand-holding from the documentation or forums
    - set up wiring quickly, easily and consistently
    - reduce or eliminate store boilerplate

- Ideal scenario:

    - works in any project
    - works with, not against, Vuex
    - doesn't require hacks to get working
    - doesn't require compromises in Vuex or JavaScript
    - can be integrated a little or a lot
    - significant reduction in lines of code
    - removes need for defensive programming
    - adds additional useful functionality
    - approved by advanced users
    - easy for beginners


## Result

Pathify is the result of around 6 months of incremental development, on one large project and a couple of smaller ones. It morphed from being a kitchen-sink of tools and plugins (including state persistence, store lifecycle, and transmitting state by the URL) to being only concerned with getting and setting state via paths.

Looking at the list above, we can see that Pathify solves the following:

1. **Syntax juggling**

    [Path syntax](/api/paths.md) unifies differing varied state, getters, commit and dispatch syntax.
    
    [Accessor priority](/api/properties.md#accessor-priority) decouples store access from store architecture and makes it simple to get or set.

2. **Boilerplate**

    [Store helpers](/api/store.md) eliminate store boilerplate.

3. **Wiring**

    [Component helpers](/api/component.md) eliminate wiring boilerplate.

    [Sub-property access](/api/properties.md#sub-property-access) enables transparent read and write for complex properties.

4. **Works in any project**

    [Mapping configuration](/setup/mapping.md) enables property mapping in any project.
    
    [Direct-property access](/api/properties.md#direct-property-access) handles unmappable properties.

5. **Simplicity**

    4 Vuex operations simplified to 2 Pathify operations.

    Path format does away with 3 different syntax types.
    
    Setting up and wiring properties takes 1 line per-file for multiple properties, not 3 - 8 lines per-property, per-file.

    Depending on your developmental / team requirements, no need for redundant or complex "best practices".

    Easy for beginners.
