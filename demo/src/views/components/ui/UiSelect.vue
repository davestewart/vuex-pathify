<template>

  <div class="field">
    <label class="label is-small">{{ label }}</label>
    <div class="control">
      <div class="select is-small">
        <select v-model="model">
          <option v-if="initial" value="">{{ initial }}</option>
          <option v-for="opt in opts" :selected="opt === value" :value="opt">{{ opt }}</option>
        </select>
      </div>
    </div>
  </div>

</template>

<script>

  export default {
    props: {
      label: String,
      value: String,
      initial: String,
      options: String,
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set (value) {
          this.$emit('input', value)
        }
      },

      opts () {
        return this.options.match(/\w+/g)
      }
    }
  }

</script>

<style lang="scss" scoped>
  select {
    display: inline-block;
    text-transform: capitalize;
  }
</style>