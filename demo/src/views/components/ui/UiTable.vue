<template>

  <table class="table">
    <thead>
    <tr>
      <td v-for="key in headings" :style="!isNaN(parseFloat(data[0][key])) ? 'text-align: right' : ''">{{ key }}</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="row in data">
      <td v-for="(value, key) in row" v-html="String(value).split(',').join('<br>')" v-bind="getStyle(value, key)"></td>
    </tr>
    </tbody>
  </table>

</template>

<script>
  export default {
    props: {
      data: Array
    },

    computed: {
      headings () {
        return Object.keys(this.data[0])
      },

      ranges () {
        const values = {}
        const keys = Object.keys(this.data[0])
        this.data.forEach(row => {
          keys.forEach(key => {
            const value = parseFloat(row[key])
            if (!isNaN(value)) {
              if(values[key] === undefined) {
                values[key] = {min: undefined, max: undefined}
              }
              if (value < values[key].min || values[key].min === undefined) {
                values[key].min = value
              }
              if (value > values[key].max || values[key].max === undefined) {
                values[key].max = value
              }
            }
          })
        })
        return values
      }
    },

    methods: {
      getStyle (value, key) {
        if (key in this.ranges) {
          value = parseFloat(value)
          if(!isNaN(value)) {
            // value
            let range = this.ranges[key]
            const min = range.min
            const max = range.max * 1.03
            const ratio = 1 - ((value - min) / (max - min))
            const color = ratio >= 0.9 ? 'white' : 'black'

            // render
            const bgColor = [37, 175, 175].map(value => Math.floor(value * 0.85))
            return {
              style: `color: ${color}; background-color: rgba(${bgColor.join(',')}, ${ratio})`,
              class: 'numeric'
            }
          }
        }
        return null
      }
    }
  }

</script>

<style lang="scss" scoped>

  thead td {
    font-weight: 700;
  }

  .numeric {
    text-align: right;
    padding-right: 1em;
    border-bottom: none;
  }
</style>