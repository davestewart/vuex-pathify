<template>

  <div class="field ui-select">
    <label v-if="label" class="label is-small">{{ label }}</label>
    <div class="control">
      <div class="select is-small">
        <select v-model="model">
          <option v-if="prompt" value="">{{ prompt }}</option>
          <option v-for="opt in opts"
                  :selected="String(opt.value) === String(val)"
                  :value="opt.value">{{ opt.name }}
          </option>
        </select>
      </div>
    </div>
  </div>

</template>

<script>

  import _ from 'lodash'

  export default {
    props: {
      label: String,
      prompt: String,
      options: {
        type: [String, Array, Object],
        required: true
      },
      value: [String, Number],
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
        const opts = this.options
        // {a:1, b:2, ... }
        if (_.isPlainObject(opts)) {
          return Object
            .keys(opts)
            .reduce((values, key) => {
              values.push({ name: key, value: opts[key] })
              return values
            }, [])
        }

        let values
        if (_.isArray(opts)) {
          // [{name: 'a', value: 1}, ...]
          if (opts.every(value => typeof value === 'object')) {
            return opts
          }

          // ['a', 'b', ...]
          values = opts
        }

        // 'a b c'
        if (_.isString(opts)) {
          values = opts.match(/\w+/g)
        }

        // build name > value array
        if (values) {
          return values
            .reduce((values, value) => {
              values.push({ name: value, value })
              return values
            }, [])
        }
      },

      val () {
        return this.value || this.opts[0].value
      },

      opt () {
        return this.opts.find(opt => opt.value === this.value)
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