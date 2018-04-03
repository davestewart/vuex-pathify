<template>
  <label>{{ label }}: <input v-model="model"></label>
</template>

<script>

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
        set (value) {
          this.$emit('input', value)
        }
      }
    }
  }

</script>

<style lang="sass">

</style>