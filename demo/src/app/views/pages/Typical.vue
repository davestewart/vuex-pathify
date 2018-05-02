<template>
  <article>

    <div class='content'>
      <h2 class='title is-2'>Typical component</h2>
      <h4 class='title is-4'>Overview</h4>
      <p>This section compares various ways to setup and wire what might be considered a "typical" component:</p>
      <ul>
        <li>A mix of read and read/write properties</li>
        <li>2 top-level properties, 5 sub-properties</li>
      </ul>
      <p>The component <strong>loads and renders a list of Github repositories</strong> allowing the user to filter the
        list with
        standard UI controls.</p>

      <h4 class='title is-4'>Code</h4>
      <p>The code can be found in <code>src/examples/typical</code>.</p>
      <p>For each of the examples:</p>
      <ul>
        <li>both the store and the component extend from base files</li>
        <li>the component sets up computed properties and control wiring</li>
        <li>the stores set up mutations only</li>
      </ul>

      <h4 class='title is-4'>Analysis</h4>
      <p>The grouped, sub-property access is what makes this component interesting.</p>
      <p>Pathify makes it easy to target groups with its <code>@</code> sub-property syntax, whilst the <code>*</code>
        wildcard syntax automatically wires sub-properties, with <code>make.mutations()</code> handling automatic
        setting of sub-properties. </p>
      <p>With manual JavaScript, significantly more syntaxes and styles are required to wire the same properties, including manually creating, passing, destructuring and assigning payloads.</p>
      <p>With the helpers approach, templates need manually-created value and handler attributes, code must be added to
        computed and methods blocks, and a deep watcher is needed to trigger a store update.</p>
      <p>Note that all examples in this set use the "light" Vuex approach, which is to reference <strong>state and mutations</strong> only.</p>

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
            "Approach": "Pathify",
            "Total lines": 18,
            "Total chars": 312,
            "Lines/prop": 2.6,
            "Chars/prop": 44.6,
            "Multiplier": 1.0
          },
          {
            "Approach": "Vuex Helpers (light)",
            "Total lines": 48,
            "Total chars": 866,
            "Lines/prop": 6.9,
            "Chars/prop": 123.7,
            "Multiplier": 2.8
          },
          {
            "Approach": "Vue Computed (light)",
            "Total lines": 67,
            "Total chars": 1254,
            "Lines/prop": 9.6,
            "Chars/prop": 179.1,
            "Multiplier": 4.0
          }
        ],

        styles: [
          {
            "Approach": "Pathify",
            "Naming": "state",
            "Bindings": "v-model",
            "Blocks": "computed",
            "Component code": "get, sync",
            "Store code": "state, make.mutations",
            "Total": 7
          },
          {
            "Approach": "Vue Computed (light)",
            "Naming": "state, SET_STATE",
            "Bindings": "v-model",
            "Blocks": "computed",
            "Component code": "function, compound function, state syntax, getter syntax, commit, payload",
            "Store code": "state, mutations, functions, assignment, destructuring, array access",
            "Total": 16
          },
          {
            "Approach": "Vuex Helpers (light)",
            "Naming": "state, SET_STATE",
            "Bindings": ":value, @input, payload, $event",
            "Blocks": "computed, methods",
            "Component code": "mapState, mapGetters, mapMutations, deep watch",
            "Store code": "state, mutations, functions, assignment, destructuring, array access",
            "Total": 18
          },

        ]
      }
    },

  }

</script>
