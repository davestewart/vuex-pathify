<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Advanced property access</h2>
      <blockquote>
        <p>Pathify has a few tricks such as accessor priority and direct syntax, to add functionality and bridge configuration gaps</p>
        <table>
          <tr><td>Pathify:</td>
          <td>
            <view-code src="examples/api/views/Properties.vue"/>
            <view-code src="examples/api/stores/icons.js"/>
            <view-docs src="api/properties"/>
          </td></tr>
          <tr><td>Icon:</td>
          <td>
            <view-code src="views/components/ui/UiIcon.vue" label="View Icon component" />
            <view-code src="examples/api/icons/factory.js" label="View Icon factory" />
            <view-code src="examples/api/icons/service/Icon.js" label="View Icon class" />
          </td></tr>
        </table>
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
        <ui-button label="Get SVG" @click="getSvg"/>
      </div>

      <!-- icon functionality via custom Icon class -->
      <!-- icon types via IconFactory and custom imports -->
      <div class="icons" v-if="icons.length">

        <!-- standard ui-icon component; renders what it is given! -->
        <ui-icon v-for="(icon, index) in icons"
             :key="index"
             :title="icon.title"
             :svg="icon.render(style)"
             @click="show(icon)">
        </ui-icon>
      </div>

      <!-- user prompt -->
      <div v-else>Use the controls above to add icons...</div>
    </div>

    <!-- thanks for the free icons! -->
    <div class="attribution">Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a
      href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a
      href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC BY 3.0</a>
    </div>

  </article>

</template>

<script>
  import _ from 'lodash'

  import { get, sync, commit, dispatch } from 'vuex-pathify'

  import template from '!!raw-loader!../icons/template.html'

  import factory from '../icons/factory'


  /**
   * This file demonstrates:
   *
   * Pathify features:
   *
   * - using accessor priority to work with classes not objects
   * - using direct syntax to call non SET_* members on the store
   * - using Pathify's Vuex aliases to call Vuex directly
   * - skipping Pathify and just calling Vuex directly
   *
   * Custom classes
   *
   * - using functionality in the view from custom classes
   * - using custom properties and calling custom methods on the class
   * - using the class independently of the component or store
   *
   * The Icon example has become a bit extravagant, but the principle is sound; encapsulating logic
   * in classes, rather than the view or store, can help to reduce repetition and cruft in the rest
   * of your application
   */
  export default {

    data () {
      // get ui data from factory
      const { names, colors, styles } = factory

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
       * The Icon class demonstrates:
       *
       *  - new properties from existing values, i.e. title and hex color
       *  - a render() function to transform existing values (SVG) at run time
       *
       * As the functionality is encapsulated on the Icon class, the methods can be called from anywhere.
       *
       * Try running this in the console:
       *
       *  - store.get('icons/data')[0].show()
       */
      icons: get('icons/data'),

      // sync style in store
      style: sync('icons/style'),
    },

    watch: {
      name: 'update',
      color : 'update',
    },

    // to target non SET_* members, use these techniques:
    methods: {

      // call mutation using direct access (!) syntax
      addIcon () {
        // try removing the ! to see what happens (check the console)
        // try using the commit() vuex alias to achieve the same
        this.$store.set('icons/ADD_ICON!', {name: this.name, color: this.color})
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

      // use properties and functions from Icon instance directly
      show (icon) {
        const html = _.template(template)({
          file: `${icon.name}.svg`,
          svg: icon.getSvg()
        })
        const win = window.open('', 'icon')
        win.document.write(html)
        win.document.close()
      },

      // use Icon class (via IconFactory) independently of component or store
      getSvg () {
        const svg = factory
          .create(this.name, this.color)
          .render(this.style)
        console.log(svg)
      },

      // utility
      update () {
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

  table {
    tr:last-child td {
      border: none;
    };
  }
</style>