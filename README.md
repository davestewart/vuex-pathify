![splash](docs/assets/img/readme/splash.png)

## Overview

Pathify makes working with Vuex **easy** with a **unified, state-based, path syntax**:

![pathify-path](docs/assets/img/readme/pathify-path.png)

Pathify's core helpers let you easily **read, write** or **sync** any store **property** or **sub-property**:

![pathify-diagram](docs/assets/img/readme/pathify-diagram.png)

In conjunction with store helpers, Pathify results in zero store boilerplate, one-liner wiring and overall cleaner code.


## Pathify API

Let's expand on the example above and check out some of Pathify's additional features.

Here's the example store:

![vuex-store](docs/assets/img/readme/vuex-store.png)

We've:

- a module **foo**
- a top-level property **bar**
- a sub-property **baz**

**Reading, writing** and **wiring** are handled via Pathify's [store accessors] and [component helpers] using [path syntax] you just saw:

![pathify-code](docs/assets/img/readme/pathify-code.png)

Sub-properties are accessed using the `@` symbol (though the functionality can be disabled if required). Multiple properties can be wired using object or array syntax, with wildcard `*` syntax wiring properties (or sub-properties) automatically.

When it comes to store setup, Pathify's [store helpers] make it a **one-liner, completely scalable** affair:

![pathify-mutations](docs/assets/img/readme/pathify-mutations.png)

Note that Pathify can create getters and actions as well, though the consistency of Pathify's path format allows you to dispense with redundant actions if your aim is merely to keep things consistent.


## Comparing to Vuex

The start of most Vuex projects require extensive manual, labourious, store setup:

![vuex-mutations](docs/assets/img/readme/vuex-mutations.png)
 
Getting and setting values requires juggling accessors, syntax and naming:

![vuex-code](docs/assets/img/readme/vuex-code.png)

Wiring Component can require up to 4 different helpers, name juggling, and more:

![vuex-helpers](docs/assets/img/readme/vuex-helpers.png)

As such, Pathify's demo [compares](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo?initialpath=code) what could be considered both typical and large components across a variety of Pathify and Vuex setups, and finds Pathify setups coming in between 2 and 15 times less code than vanilla Vuex.


## Next steps

So if you like what you see, here's where to go next:

- Try the [demo](https://codesandbox.io/s/github/davestewart/vuex-pathify/tree/master/demo)
- Check out the [documentation](https://davestewart.github.io/vuex-pathify/)
- Install the [package](https://www.npmjs.com/package/vuex-pathify)


[path syntax]: https://davestewart.github.io/vuex-pathify/#/api/paths
[component helpers]: https://davestewart.github.io/vuex-pathify/#/api/component
[store helpers]: https://davestewart.github.io/vuex-pathify/#/api/store
[store accessors]: https://davestewart.github.io/vuex-pathify/#/api/accessors


