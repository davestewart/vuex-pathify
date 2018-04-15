<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vuex helpers (light)</h2>
      <blockquote>
        <p>Demo uses Vuex helpers and manually-created handlers, accessing the store via state and mutations.</p>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
        <legend>Personal</legend>
        <ui-input label="First Name"
                  :value="firstName"
                  @input="SET_FIRST_NAME"
                  />
        <ui-input label="Last Name"
                  :value="lastName"
                  @input="SET_LAST_NAME"
                  />
        <ui-input label="Email"
                  :value="email"
                  @input="SET_EMAIL"
                  />
        <ui-input label="Website"
                  :value="website"
                  @input="SET_WEBSITE"
                  />
        <ui-input label="Phone"
                  :value="phone"
                  @input="SET_PHONE"
                  />
      </fieldset>

      <fieldset class="column">
        <legend>Address</legend>
        <ui-input label="Line1"
                  :value="address.line1"
                  @input="SET_LINE1"
                  />
        <ui-input label="Line2"
                  :value="address.line2"
                  @input="SET_LINE2"
                  />
        <ui-input label="Town"
                  :value="address.town"
                  @input="SET_TOWN"
                  />
        <ui-input label="Zipcode"
                  :value="address.zipcode"
                  @input="SET_ZIPCODE"
                  />
      </fieldset>
    </div>
    <div class="card">
      <div class="card-content content">
        <p class="title is-4">{{ name }}</p>
        <p class="subtitle is-6"><a :href="'mailto:' + email">{{ email }}</a> | <a :href="website">{{ website }}</a> | {{ phone }}</p>
        <p>{{ address.line1 }}<br>{{ address.line2 }}<br>{{ address.town }}<br>{{ address.zipcode }}</p>
      </div>
    </div>

  </article>

</template>

<script>
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {

    computed: {

      ...mapGetters('user3', [
        'name',
      ]),

      ...mapState('user3', [
        'firstName',
        'lastName',
        'email',
        'website',
        'phone',
        'address',
      ])
    },

    methods: {
      ...mapMutations('user3', [
        'SET_FIRST_NAME',
        'SET_LAST_NAME',
        'SET_EMAIL',
        'SET_WEBSITE',
        'SET_PHONE',
        'SET_LINE1',
        'SET_LINE2',
        'SET_TOWN',
        'SET_ZIPCODE',
      ]),

      setAddress(key, value) {
        this.$store.commit('SET_ADDRESS', {key, value})
      }
    },
  }
</script>
