<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Advanced property access</h2>
      <blockquote>
        <p>Pathify has a few tricks such as accessor priority and direct syntax, to add functionality and bridge configuration gaps</p>
        <view-code src="examples/api/views/Properties.vue"/>
        <view-code src="examples/api/stores/icons.js"/>
        <view-code src="examples/api/classes/Icon.js" label="View Icon class" />
        <view-docs src="api/properties"/>
      </blockquote>
    </div>

    <div class="content">
      <!-- controls -->
      <div class="controls field is-horizontal">
        <ui-select label="Style" :options="styles" v-model="style"/>
        <ui-select label="Color" :options="colors" v-model="color"/>
        <ui-select label="Icon" :options="names" v-model="name"/>
        <ui-button label="Add" @click="addIcon"/>
        <ui-button label="Add random" @click="addRandom"/>
        <ui-button label="Clear" @click="clear"/>
      </div>

      <!-- icon presentation and functionality via custom Icon classes -->
      <div class="icons" v-if="icons.length">
        <icon v-for="(icon, index) in icons"
             :key="index"
             :title="icon.title"
             :svg="icon.render(style)"
             @click="icon.show()">
        </icon>
      </div>

      <!-- user prompt -->
      <div v-else>Use the controls above to add icons...</div>
    </div>

    <div class="attribution">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a
      href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a
      href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC BY 3.0</a>
    </div>

  </article>

</template>

<script>
  import _ from 'lodash'

  import { get, sync, commit, dispatch } from 'vuex-pathify'

  import { names, colors, styles } from '../classes/options'

  import Icon from './ui/Icon'

  export default {
    components: {
      Icon
    },

    data () {
      return {
        names,
        name: names[0],
        colors,
        color: colors[0],
        styles,
      }
    },

    computed: {
      /**
       * Accessor priority
       *
       * Pathify chooses same-named getters over same-named states, in this case returning an array of Icon
       * instances with transformed properties and additional methods, rather than just a plain Object
       *
       * Encapsulating logic in classes, rather than the view or store, reduces tight coupling and repetition
       * in the rest of your application
       *
       * The Icon class demonstrates:
       *
       *  - new properties from existing values, i.e. title and hex color
       *  - a render() function to transform existing values (SVG) at run time
       *  - a show() function to perform an additional operation, independent of store or view
       *
       * As the functionality is encapsulated on the Icon class, the methods can be called from anywhere.
       *
       * Try running this in the console:
       *
       *  - store.get('icons/data')[0].show()
       */
      icons: get('icons/data'),

      style: sync('icons/style'),
    },

    watch: {
      name: 'onUpdate',
      color : 'onUpdate',
    },

    // to target non SET_* members, use these techniques:
    methods: {

      // call mutation using direct access (!) syntax
      addIcon () {
        // try removing the ! to see what happens (check the console)
        // try using the commit() vuex alias to achieve the same
        this.$store.set('icons/ADD_ICON!', {color: this.color, name: this.name})
      },

      // call action using vuex alias
      addRandom () {
        // try using pathify and direct syntax to achieve the same result
        dispatch('icons/addRandom')
      },

      // call action using vuex directly
      clear () {
        this.$store.dispatch('icons/clear')
      },

      // utility
      onUpdate () {
        this.$nextTick(this.addIcon)
      },

    }
  }

</script>

<style lang="scss">
  .attribution {
    position: absolute;
    bottom: 0;
    padding: 10px;
    background: #FFF;
  }
</style>