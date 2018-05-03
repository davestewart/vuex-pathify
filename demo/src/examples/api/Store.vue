<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Store helpers</h2>
      <blockquote>
        <p>Store helpers help set up stores quickly, by generating default mutations, getters and actions</p>
        <edit-code src="examples/api/Store.vue"/>
        <edit-code src="examples/api/vuex/helpers.js"/>
        <view-docs src="api/store"/>
      </blockquote>
    </div>

    <div class="content">
      <p>Store:</p>
      <pre>state: {{ state }}</pre>
      <pre>total: {{ total }}</pre>

      <p>Status:</p>
      <pre>{{ status }}</pre>

      <p>Tasks:</p>
      <ul>
        <li><a href="#" @click.prevent="setFoo">Set foo</a></li>
        <li><a href="#" @click.prevent="setBar">Set bar</a></li>
        <li><a href="#" @click.prevent="setBaz">Set baz</a></li>
        <li><a href="#" @click.prevent="dispatchFoo">set foo (via action)</a></li>
        <li><a href="#" @click.prevent="incrementFoo">Increment foo</a></li>
        <li><a href="#" @click.prevent="loadFoo">Load foo</a></li>
        <li><a href="#" @click.prevent="clear">Clear</a></li>
        <li><a href="#" @click.prevent="reset">Reset</a></li>
      </ul>

    </div>

  </article>

</template>

<script>
  import { get } from 'vuex-pathify'

  import store from '../../app/store/index'

  export default {
    data () {
      return {
        // pull the state in directly (this stays reactive)
        state: this.$store.state.helpers,

        // local status
        status: 'Waiting for input...',
      }
    },

    computed: {
      // 1-way wire of custom `total` getter
      total: get('helpers/total')
    },

    // the methods below simply call the created methods on the store
    methods: {
      setFoo () {
        // directly set foo
        store.set('helpers/foo', 123)
        this.status = 'Set foo (via pathify set)'
      },

      setBar () {
        // directly set foo
        store.set('helpers/bar', 456)
        this.status = 'Set bar (via pathify set)'
      },

      setBaz () {
        // directly set foo
        store.set('helpers/baz@value', 789)
        this.status = 'Set baz (via pathify set)'
      },

      dispatchFoo () {
        // directly set foo
        store.dispatch('helpers/setFoo', 1000)
        this.status = 'Set foo (via dispatch)'
      },

      incrementFoo () {
        // use direct syntax to target the non-SET_* naming
        store.set('helpers/INCREMENT_FOO!')
        this.status = 'Incremented foo'
      },

      loadFoo () {
        this.status = 'Loading foo...'
        store
          // again, using direct syntax to target the non-SET_* naming
          .set('helpers/loadFoo!')
          // loadFoo returns a promise, so we can wait for it
          .then(() => this.status = 'Foo loaded!')
      },

      clear () {
        store.set('helpers/foo', 0)
        store.set('helpers/bar', 0)
        store.set('helpers/baz@value', 0)
        this.status = 'Cleared'
      },

      reset () {
        store.set('helpers/foo', 1)
        store.set('helpers/bar', 2)
        store.set('helpers/baz@value', 3)
        this.status = 'Reset!'
      }


    }
  }

</script>

