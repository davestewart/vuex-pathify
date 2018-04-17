<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vue computed (light)</h2>
      <blockquote>
        <p>Demo uses manually-created computed properties, accessing the store via state and mutations.</p>
        <view-code src="examples/large/views/VueComputedLight.vue"/>
        <view-code src="examples/large/stores/vuex-light.js"/>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <ui-input label="First Name" v-model="firstName"/>
        <ui-input label="Last Name" v-model="lastName"/>
        <ui-input label="Email" v-model="email"/>
        <ui-input label="Website" v-model="website"/>
        <ui-input label="Phone" v-model="phone"/>
      </fieldset>

      <fieldset class="column">
        <ui-input label="Street" v-model="street"/>
        <ui-input label="Area" v-model="area"/>
        <ui-input label="Town" v-model="town"/>
        <ui-input label="Zipcode" v-model="zipcode"/>
        <ui-input label="Country" v-model="country"/>
      </fieldset>
    </div>

    <div class="card">
      <div class="card-content content">
        <p class="title is-4">{{ firstName }} {{ lastName }}</p>
        <p class="subtitle is-6"><a :href="'mailto:' + email">{{ email }}</a> | <a :href="website">{{ website }}</a> |
          {{ phone }}</p>
        <p>{{ street }}<br>{{ area }}<br>{{ town }}<br>{{ zipcode }}<br>{{ country }}</p>
      </div>
    </div>
  </article>

</template>

<script>
  export default {
    computed: {
      firstName: {
        get () {
          return this.$store.state.user3.firstName
        },
        set (value) {
          this.$store.commit('user3/SET_FIRST_NAME', value)
        }
      },

      lastName: {
        get () {
          return this.$store.state.user3.lastName
        },
        set (value) {
          this.$store.commit('user3/SET_LAST_NAME', value)
        }
      },

      email: {
        get () {
          return this.$store.state.user3.email
        },
        set (value) {
          this.$store.commit('user3/SET_EMAIL', value)
        }
      },

      website: {
        get () {
          return this.$store.state.user3.website
        },
        set (value) {
          this.$store.commit('user3/SET_WEBSITE', value)
        }
      },

      phone: {
        get () {
          return this.$store.state.user3.phone
        },
        set (value) {
          this.$store.commit('user3/SET_PHONE', value)
        }
      },

      street: {
        get () {
          return this.$store.state.user3.street
        },
        set (value) {
          this.$store.commit('user3/SET_STREET', value)
        }
      },

      area: {
        get () {
          return this.$store.state.user3.area
        },
        set (value) {
          this.$store.commit('user3/SET_AREA', value)
        }
      },

      town: {
        get () {
          return this.$store.state.user3.town
        },
        set (value) {
          this.$store.commit('user3/SET_TOWN', value)
        }
      },

      zipcode: {
        get () {
          return this.$store.state.user3.zipcode
        },
        set (value) {
          this.$store.commit('user3/SET_ZIPCODE', value)
        }
      },

      country: {
        get () {
          return this.$store.state.user3.country
        },
        set (value) {
          this.$store.commit('user3/SET_COUNTRY', value)
        }
      },

    }
  }
</script>
