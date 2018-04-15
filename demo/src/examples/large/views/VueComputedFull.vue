<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vue computed (full)</h2>
      <blockquote>
        <p>Demo uses manually-created computed properties, accessing the store via getters and actions.</p>
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
        return this.$store.getters['user6/name']
      },

      firstName: {
        get () {
          return this.$store.getters['user6/firstName']
        },
        set (value) {
          this.$store.dispatch('user6/setFirstName', value)
        }
      },

      lastName: {
        get () {
          return this.$store.getters['user6/lastName']
        },
        set (value) {
          this.$store.dispatch('user6/setLastName', value)
        }
      },

      email: {
        get () {
          return this.$store.getters['user6/email']
        },
        set (value) {
          this.$store.dispatch('user6/setEmail', value)
        }
      },

      website: {
        get () {
          return this.$store.getters['user6/website']
        },
        set (value) {
          this.$store.dispatch('user6/setWebsite', value)
        }
      },

      phone: {
        get () {
          return this.$store.getters['user6/phone']
        },
        set (value) {
          this.$store.dispatch('user6/setPhone', value)
        }
      },

      address: {
        get () {
          return this.$store.getters['user6/address']
        },
        set (value) {
          this.$store.dispatch('user6/setAddress', value)
        }
      },

      line1: {
        get () {
          return this.$store.getters['user6/line1']
        },
        set (value) {
          this.$store.dispatch('user6/setLine1', value)
        }
      },

      line2: {
        get () {
          return this.$store.getters['user6/line2']
        },
        set (value) {
          this.$store.dispatch('user6/setLine2', value)
        }
      },

      town: {
        get () {
          return this.$store.getters['user6/town']
        },
        set (value) {
          this.$store.dispatch('user6/setTown', value)
        }
      },

      zipcode: {
        get () {
          return this.$store.getters['user6/zipcode']
        },
        set (value) {
          this.$store.dispatch('user6/setZipcode', value)
        }
      },

    }
  }
</script>
