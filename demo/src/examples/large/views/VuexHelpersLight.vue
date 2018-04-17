<template>
  <article>

    <div class="content">
      <h2 class="title is-2"><span>Large component</span>Vuex helpers (light)</h2>
      <blockquote>
        <p>Demo uses Vuex helpers and manually-created handlers, accessing the store via state and mutations.</p>
        <links file="examples/large/views/VuexHelpersLight.vue"/>
      </blockquote>
    </div>

    <div class="columns">
      <fieldset class="column">
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
        <ui-input label="Street"
                  :value="street"
                  @input="SET_STREET"
        />
        <ui-input label="Area"
                  :value="area"
                  @input="SET_AREA"
        />
        <ui-input label="Town"
                  :value="town"
                  @input="SET_TOWN"
        />
        <ui-input label="Zipcode"
                  :value="zipcode"
                  @input="SET_ZIPCODE"
        />
        <ui-input label="Country"
                  :value="country"
                  @input="SET_COUNTRY"
        />
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
  import { mapState, mapGetters, mapMutations } from 'vuex'

  export default {

    computed: {
      ...mapState('user5', [
        'firstName',
        'lastName',
        'email',
        'website',
        'phone',
        'street',
        'area',
        'town',
        'zipcode',
        'country',
      ])
    },

    methods: {
      ...mapMutations('user5', [
        'SET_FIRST_NAME',
        'SET_LAST_NAME',
        'SET_EMAIL',
        'SET_WEBSITE',
        'SET_PHONE',
        'SET_STREET',
        'SET_AREA',
        'SET_TOWN',
        'SET_ZIPCODE',
        'SET_COUNTRY',
      ]),
    },
  }
</script>
