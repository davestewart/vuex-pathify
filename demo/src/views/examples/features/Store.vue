<template>
  <article>

    <div class="content">
      <h3 class="title is-3">Store helpers example</h3>
      <p>Use get, set and copy to interact with the store directly</p>
    </div>

    <div>
      <button class="button is-small" @click="setValue">Set</button>
      <button class="button is-small" @click="getValue">Get</button>
      <button class="button is-small" @click="copyValue">Copy</button>
    </div>
    <pre>Value: {{ value }}</pre>
    <pre>Object: {{ object }}</pre>
  </article>
</template>

<script>
  export default {
    data () {
      return {
        value: this.$store.state.basics.value,
        object: this.$store.state.basics.object,
      }
    },

    methods: {
      setValue () {
        this.$store.set('basics/value', new Date)
      },

      getValue () {
        this.value = this.$store.get('basics/value')
      },

      copyValue () {
        const object = this.$store.copy('basics/object')
        object.foo = new Date()
        this.object = object
      },

    }
  }
</script>
