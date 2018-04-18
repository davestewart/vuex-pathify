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
        <ui-select label="Color" :options="colors" v-model="color"/>
        <ui-select label="Icon" :options="names" v-model="name"/>
        <ui-button label="Add random" @click="addRandom"/>
        <ui-button label="Clear" @click="clear"/>
      </div>

      <!-- render icons using custom Icon classes -->
      <div class="icons" v-if="icons.length">
        <div v-for="(icon, index) in icons"
             class="icon-container"
             :key="index"
             :title="icon.description">
          <span class="icon" @click="onClick(icon)">
            <span class="svg" v-html="icon.render()"></span>
          </span>
          <p class="desc">{{ icon.description }}</p>
        </div>
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

  import { get, commit, dispatch } from 'vuex-pathify'

  import { names, colors } from '../classes/options'

  export default {
    data () {
      return {
        names,
        name: names[0],
        colors: colors,
        color: colors[0]
      }
    },

    computed: {
      // pathify chooses same-named getters over same-named states, in this case returning an array
      // of Icon instances with transformed properties and methods, rather than just a plain Object
      icons: get('icons/data'),
    },

    watch: {
      name (value) { this.addIcon(value, this.color) },
      color (value) { this.addIcon(this.name, value) },
    },

    // to target non SET_* members, use these techniques:
    methods: {
      // call mutation using direct access (!) syntax
      addIcon (name, color) {
        this.$store.set('icons/ADD_ICON!', {name, color}) // try removing the ! to see what happens (check the console)
                                                          // try using the commit() vuex alias to achieve the same
      },

      // call action using vuex alias
      addRandom () {
        dispatch('icons/addRandom')                       // try using direct syntax to achieve the same
      },

      // call action using vuex directly
      clear () {
        this.$store.dispatch('icons/clear')
      },

      // call method on returned Icon instance directly
      onClick (icon) {
        icon.doSomething()                                // try moving this call directly to the markup
      }
    }
  }

</script>

<style lang="scss">
  .icon-container {
    display: inline-block;
    width: 100px;
    margin: 5px;
    overflow: hidden;

    > .icon {
      width: 100px;
      height: 100px;
      cursor: pointer;
      margin-bottom: -3px;

      > .svg {
        display: inline-block;
        margin: 20px;
        line-height: 1em;
        transition: 1s all;
      }

      &:hover {
        .svg {
          transition: 0.1s all;
          transform: scale(1.5);
        }
      }

    }

    > .desc {
      text-align: center;
      background: white;
      color: black;
      font-size: 0.9em;
    }

  }

  .attribution {
    position: absolute;
    bottom: 0;
    padding: 10px;
    background: #FFF;
  }
</style>