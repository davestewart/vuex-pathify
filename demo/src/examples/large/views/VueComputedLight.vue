<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vue computed (light)</h2>
      <blockquote>
        <p>Page uses manually-created computed properties, accessing the store via state and mutations.</p>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <legend>Personal</legend>
        <ui-input label="First Name" v-model="firstName" />
        <ui-input label="Last Name" v-model="lastName" />
        <ui-input label="Email" v-model="email" />
        <ui-input label="Website" v-model="website" />
        <ui-input label="Phone" v-model="phone" />
      </fieldset>

      <fieldset class="column">
        <legend>Address</legend>
        <ui-input label="Line1" v-model="line1" />
        <ui-input label="Line2" v-model="line2" />
        <ui-input label="Town" v-model="town" />
        <ui-input label="Zipcode" v-model="zipcode" />
      </fieldset>
    </div>

    <div class="card">
      <div class="card-content content">
        <p class="title is-4">{{ name }}</p>
        <p class="subtitle is-6"><a :href="'mailto:' + email">{{ email }}</a> | <a :href="website">{{ website }}</a> | {{ phone }}</p>
        <p>{{ line1 }}<br>{{ line2 }}<br>{{ town }}<br>{{ zipcode }}</p>
      </div>
    </div>

  </article>

</template>

<script>
  export default {
    computed: {

      name () {
        return this.$store.getters['user5/name']
      },

      firstName: {
        get () {
          return this.$store.state.user5.firstName
        },
        set (value) {
          this.$store.commit('user5/SET_FIRST_NAME', value)
        }
      },

      lastName: {
        get () {
          return this.$store.state.user5.lastName
        },
        set (value) {
          this.$store.commit('user5/SET_LAST_NAME', value)
        }
      },

      email: {
        get () {
          return this.$store.state.user5.email
        },
        set (value) {
          this.$store.commit('user5/SET_EMAIL', value)
        }
      },

      website: {
        get () {
          return this.$store.state.user5.website
        },
        set (value) {
          this.$store.commit('user5/SET_WEBSITE', value)
        }
      },

      phone: {
        get () {
          return this.$store.state.user5.phone
        },
        set (value) {
          this.$store.commit('user5/SET_PHONE', value)
        }
      },

      address: {
        get () {
          return this.$store.state.user5.address
        },
        set (value) {
          this.$store.commit('user5/SET_ADDRESS', value)
        }
      },

      line1: {
        get () {
          return this.$store.state.user5.address.line1
        },
        set (value) {
          this.$store.commit('user5/SET_LINE1', value)
        }
      },

      line2: {
        get () {
          return this.$store.state.user5.address.line2
        },
        set (value) {
          this.$store.commit('user5/SET_LINE2', value)
        }
      },

      town: {
        get () {
          return this.$store.state.user5.address.town
        },
        set (value) {
          this.$store.commit('user5/SET_TOWN', value)
        }
      },

      zipcode: {
        get () {
          return this.$store.state.user5.address.zipcode
        },
        set (value) {
          this.$store.commit('user5/SET_ZIPCODE', value)
        }
      },

    }
  }
</script>
