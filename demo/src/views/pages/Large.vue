<template>
  <article>

    <div class='content'>
      <h2 class='title is-2'>Large component</h2>
      <h4 class='title is-4'>Overview</h4>
      <p>This section compares various ways to setup and wire what might be considered a "large" component:</p>
      <ul>
        <li>All read/write properties</li>
        <li>10 top-level properties</li>
      </ul>
      <p>The example <strong>manages a user's personal data</strong> by way of a form.</p>
      <p>Whilst an interim "model &gt; submit" approach is arguably a better way to manage form data, the example is
        intended
        to simply illustrate management of a larger component with many editable properties.</p>

      <h4 class='title is-4'>Code</h4>
      <p>The code can be found in <code>src/examples/large</code>.</p>
      <p>For each of the examples:</p>
      <ul>
        <li>the component and store code is entirely self-contained</li>
        <li>the stores set up a variety of state, getters, actions and mutations</li>
      </ul>

      <h4 class='title is-4'>Analysis</h4>
      <p>The interesting thing about this component, is just how poorly simple get/set property wiring scales with
        vanilla
        JavaScript.</p>
      <p>With Pathify, you can use <code>make.mutations()</code> and <code>*</code> wildcard syntax to effectively
        <strong>scale property wiring for free</strong>:</p>
      <pre>
// component
computed: sync('user/*')

// store
mutations: make.mutations(state)
</pre>
      <p>With manual JavaScript and Vuex, depending on your approach, it can take up to 400 characters and 16 lines
        <strong>per property</strong>:</p>
      <pre>
// template binding
v-model="firstName"

// component
firstName: {
  get () {
    return this.$store.getters['user/firstName']
  },
  set (value) {
    this.$store.dispatch('user/setFirstName', value)
  }
}

// store action
setFirstName: ({ commit }, value) => {
  commit('SET_FIRST_NAME', value)
}

// store mutation
SET_FIRST_NAME: (state, value) => {
  state.firstName = value
}

// store getter
firstName: state => state.firstName,
</pre>

      <h5 class='title is-5'>Lines of code</h5>
      <ui-table :data='lines'></ui-table>

      <h5 class='title is-5'>Complexity</h5>
      <ui-table :data='styles'></ui-table>

    </div>

  </article>
</template>

<script>

  export default {
    data () {
      return {
        lines: [
          {
            "Approach": "Pathify (implicit)",
            "Total lines": 12,
            "Total chars": 227,
            "Lines/prop": 1.1,
            "Chars/prop": 20.6,
            "Multiplier": 1.0
          },
          {
            "Approach": "Pathify (explicit)",
            "Total lines": 25,
            "Total chars": 340,
            "Lines/prop": 2.3,
            "Chars/prop": 30.9,
            "Multiplier": 1.5
          },
          {
            "Approach": "Vuex helpers (light)",
            "Total lines": 80,
            "Total chars": 1264,
            "Lines/prop": 7.3,
            "Chars/prop": 114.9,
            "Multiplier": 5.6
          },
          {
            "Approach": "Vue computed (light)",
            "Total lines": 124,
            "Total chars": 2020,
            "Lines/prop": 11.3,
            "Chars/prop": 183.6,
            "Multiplier": 8.9
          },
          {
            "Approach": "Vuex helpers (full)",
            "Total lines": 124,
            "Total chars": 2282,
            "Lines/prop": 11.3,
            "Chars/prop": 207.5,
            "Multiplier": 10.1
          },
          {
            "Approach": "Vue computed (full)",
            "Total lines": 168,
            "Total chars": 3108,
            "Lines/prop": 15.3,
            "Chars/prop": 282.5,
            "Multiplier": 13.7
          }
        ],

        styles: [
          {
            "Approach": "Pathify (all)",
            "Template": "v-model",
            "Blocks": "computed",
            "Component": "sync",
            "Syntaxes": "state, make.mutations",
            "Total": 5
          },
          {
            "Approach": "Vuex helpers (light)",
            "Template": ":value, @input",
            "Blocks": "computed, methods",
            "Component": "mapState, mapMutations",
            "Syntaxes": "state, mutations, functions, assignment",
            "Total": 10
          },
          {
            "Approach": "Vue computed (light)",
            "Template": "v-model",
            "Blocks": "computed",
            "Component": "functions, compound functions, state syntax, commit",
            "Syntaxes": "state, mutations, functions, assignment",
            "Total": 10
          },
          {
            "Approach": "Vuex helpers (full)",
            "Template": ":value, @input",
            "Blocks": "computed, methods",
            "Component": "mapGetters, mapActions",
            "Syntaxes": "state, mutations, getters, actions, functions, assignment",
            "Total": 12
          },
          {
            "Approach": "Vue computed (full)",
            "Template": "v-model",
            "Blocks": "computed",
            "Component": "functions, compound functions, getter syntax, dispatch",
            "Syntaxes": "state, mutations, getters, actions, functions, assignment",
            "Total": 12
          }
        ]
      }
    },

  }

</script>
