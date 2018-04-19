<template>
  <div class="field ui-input">
    <label v-if="label" class="label is-small">{{ label }}</label>
    <div class="control">
      <input v-model="model" class="input is-small" :type="type" placeholder="Text input">
    </div>
  </div>
</template>

<script>
  import _ from 'lodash'

  export default {
    props: {
      label: String,
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set: _.debounce(function (value) {
          this.$emit('input', value)
        }, 200)
      }
    }
  }

</script>
