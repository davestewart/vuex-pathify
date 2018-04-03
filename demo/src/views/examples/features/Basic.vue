<template>
  <section>
    <div>
      <label>Test: <pre> {{ test }}</pre></label>
    </div>

    <div>
      <label>COMMIT <input type="text" v-model="commit"></label>
    </div>

    <div>
      <label>Foo <input type="text" v-model="foo"></label>
      <pre> {{ foo }}</pre>
    </div>

    <div>
      <label>Bar <input type="text" v-model="bar"></label>
      <pre> {{ bar }}</pre>
    </div>

    <div>
      <label>Qux <input type="text" v-model="qux"></label>
      <pre> {{ qux }}</pre>
    </div>

    <pre>proxy: {{ proxy }}</pre>
    <pre>{{ basic }}</pre>
    <pre>{{ BAZ }}</pre>
  </section>
</template>

<script>
  import {get, sync, commit } from 'vuex-pathify'

  export default {
    computed: {
      commit: {
        get () {
          return this.$store.state.basic.foo
        },

        set (value) {
          commit('basic/SET_FOO', value)
        }
      },

      test: get('test'),
      // test: () => store.getters.test,
      bar: sync('basic/bar'),
      qux: sync('basic/baz@a.b.c'),
      ...sync('basic', ['foo', 'baz']),
      BAZ() {
        // return String(this.$store.get('basic/baz@a.b.c')).toUpperCase()
      },
      basic: get('basic'),
      proxy() {
        let value = this.$store.get('basic/test', this.bar)
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
