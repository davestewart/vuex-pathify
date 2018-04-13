<template>
  <div class="field">
    <label class="label is-small">{{ label }}</label>
    <div class="control">
      <input v-model="model" class="input is-small" type="text" placeholder="Text input">
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      label: String,
      value: [String, Number]
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set: _.debounce(function (value) {
          this.$emit('input', value)
        }, 250)
      }
    }
  }

</script>

<style lang="sass">

</style>