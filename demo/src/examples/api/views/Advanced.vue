<template>

  <article>

    <div class="content">
      <h2 class="title is-2">API: Advanced usage</h2>
      <blockquote>
        <p>Pathify has a few tricks such as accessor priority and direct syntax to make wiring easier</p>
      </blockquote>
    </div>

    <div class="content">
      <!-- controls -->
      <div class="field is-horizontal">
        <ui-select :options="colors" v-model="color"/>
        <ui-select :options="names" v-model="name"/>
        <ui-button label="Add random" @click="addRandom"/>
        <ui-button label="Clear" @click="clear"/>
      </div>

      <!-- render icons using custom Icon classes -->
      <div class="icons" v-if="icons.length">
        <div v-for="icon in icons"
             class="icon-container"
             :title="icon.description">
          <span class="icon"
                :style="`background-color: ${icon.color.value}`"
                @click="onClick(icon)">
            <i :class="`fa fa-${icon.name}`"></i>
          </span>
          <p class="desc">{{ icon.description }}</p>
        </div>
      </div>

      <!-- user prompt -->
      <div v-else>Use the controls above to add icons...</div>
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
        colors,
        name: 'cog',
        color: colors[0].value
      }
    },

    computed: {
      // prioritised getter: the same-named `data` getter is prioritised over state,
      // returning and array of Icon instances, rather than a plain Object
      icons: get('icons/data'),
    },

    watch: {
      name (value) { this.addIcon(value, this.color) },
      color (value) { this.addIcon(this.name, value) },
    },

    methods: {
      // call mutation using direct access (!) syntax
      addIcon (name, color) {
        let icon = {
          name: name,
          color: colors.find(c => c.value === color)
        }
        this.$store.set('icons/ADD_ICON!', icon)    // try removing the ! to see what happens (check the console)
                                                    // try using the commit() vuex alias to achieve the same
      },

      // call action using vuex alias
      addRandom () {
        dispatch('icons/addRandom')                 // try using direct syntax to achieve the same
      },

      // call action using vuex directly
      clear () {
        this.$store.dispatch('icons/clear')
      },

      // call method on returned Icon instance directly
      onClick (icon) {
        icon.doSomething()                          // try moving this call directly to the markup
      }
    }
  }

</script>

<style lang="scss">
  .icon-container {
    display: inline-block;
    width: 100px;
    margin: 5px;
    border: 1px solid #DDD;
    border-radius: 2px;
    overflow: hidden;

    > .icon {
      width: 98px;
      height: 98px;
      font-size: 50px;
      color: white;
      cursor: pointer;
      border: 2px solid white;
      margin-bottom: -3px;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));

      > i {
        transition: 1s all;
        text-shadow: 0 5px 10px rgba(0, 0, 0, 0.25);
      }

      &:hover {
        i {
          transition: 0.1s all;
          transform: scale(1.2);
        }
      }

    }

    > .desc {
      text-align: center;
      background: white;
      color: black;
    }

  }
</style>