<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Component helpers</h2>
      <blockquote>
        <p>Page uses core Pathify get and sync functions, sub-property access, and explicit object and array syntax.</p>
      </blockquote>
    </div>

    <div>
      <label>Test: <pre> {{ value }}</pre></label>
    </div>

    <ui-input v-model="commit" label="Foo (commit)"/>

    <div>
      <label>foo <input type="text" v-model="foo"></label>
      <pre> {{ foo }}</pre>
    </div>

    <div>
      <label>Bar <input type="text" v-model="bar"></label>
      <pre> {{ bar }}</pre>
    </div>
    <ui-input v-model="foo" label="bar"/>

    <div>
      <label>Qux <input type="text" v-model="qux"></label>
      <pre> {{ qux }}</pre>
    </div>

    <pre>proxy: {{ proxy }}</pre>
    <pre>{{ basics }}</pre>
    <pre>{{ BAZ }}</pre>

  </article>

</template>

<script>
  import {get, sync, commit } from 'vuex-pathify'

  export default {
    computed: {
      commit: {
        get () {
          return this.$store.state.basics.foo
        },

        set (value) {
          commit('basics/SET_FOO', value)
        }
      },

      value: get('value'),
      // value: () => store.getters.value,
      bar: sync('basics/bar'),
      qux: sync('basics/baz@a.b.c'),
      ...sync('basics', ['foo', 'baz']),
      BAZ() {
        // return String(this.$store.get('basics/baz@a.b.c')).toUpperCase()
      },
      basics: get('basics'),
      proxy() {
        let value = this.$store.get('basics/value', this.bar)
        console.log(value)
        return value
      }
    }
  }

</script>
