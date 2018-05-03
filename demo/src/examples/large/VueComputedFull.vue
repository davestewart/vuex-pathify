<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vue computed (full)</h2>
      <blockquote>
        <p>Demo uses manually-created computed properties, accessing the store via getters and actions</p>
        <edit-code src="examples/large/VueComputedFull.vue"/>
        <edit-code src="examples/large/vuex/vuex-full.js"/>
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

    <user-card user="user4"/>

  </article>

</template>

<script>
  import base from './ui/base.js'

  export default {

    extends: base,

    computed: {
      firstName: {
        get () {
          return this.$store.getters['user4/firstName']
        },
        set (value) {
          this.$store.dispatch('user4/setFirstName', value)
        }
      },

      lastName: {
        get () {
          return this.$store.getters['user4/lastName']
        },
        set (value) {
          this.$store.dispatch('user4/setLastName', value)
        }
      },

      email: {
        get () {
          return this.$store.getters['user4/email']
        },
        set (value) {
          this.$store.dispatch('user4/setEmail', value)
        }
      },

      website: {
        get () {
          return this.$store.getters['user4/website']
        },
        set (value) {
          this.$store.dispatch('user4/setWebsite', value)
        }
      },

      phone: {
        get () {
          return this.$store.getters['user4/phone']
        },
        set (value) {
          this.$store.dispatch('user4/setPhone', value)
        }
      },

      street: {
        get () {
          return this.$store.getters['user4/street']
        },
        set (value) {
          this.$store.dispatch('user4/setStreet', value)
        }
      },

      area: {
        get () {
          return this.$store.getters['user4/area']
        },
        set (value) {
          this.$store.dispatch('user4/setArea', value)
        }
      },

      town: {
        get () {
          return this.$store.getters['user4/town']
        },
        set (value) {
          this.$store.dispatch('user4/setTown', value)
        }
      },

      zipcode: {
        get () {
          return this.$store.getters['user4/zipcode']
        },
        set (value) {
          this.$store.dispatch('user4/setZipcode', value)
        }
      },

      country: {
        get () {
          return this.$store.getters['user4/country']
        },
        set (value) {
          this.$store.dispatch('user4/setCountry', value)
        }
      },

    }
  }
</script>
