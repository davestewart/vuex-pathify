<template>

  <article>

    <div class="content">
      <h3 class="title is-3">Basics example</h3>
      <p>Use get, set and copy to interact with the store directly</p>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  * {
    text-align: left;
    line-height: 1.4em;
  }

  pre {
    padding: 10px;
    background: #FCFCFC;
  }
</style>
