<template>
  <article>

    <div class="content">
      <h2 class="title is-2">API: Store helpers</h2>
      <blockquote>
        <p>Use get, set and copy to interact with the store directly</p>
      </blockquote>
    </div>

    <div>
      <button class="button is-small" @click="set">Set</button>
      <button class="button is-small" @click="get">Get</button>
      <button class="button is-small" @click="copy">Copy</button>
    </div>

    <div class="content">
      <p>Value:</p>
      <pre>{{ value }}</pre>

      <p>Copy:</p>
      <pre>{{ data }}</pre>
    </div>

  </article>
</template>

<script>
  export default {
    data () {
      return {
        value: this.$store.state.basics.date,
        data: ' ',
      }
    },

    computed: {

    },

    methods: {
      set () {
        this.$store.set('basics/date', new Date)
      },

      get () {
        this.value = this.$store.get('basics/date')
      },

      copy () {
        this.data = this.$store.copy('basics/object')
      },

    }
  }
</script>
