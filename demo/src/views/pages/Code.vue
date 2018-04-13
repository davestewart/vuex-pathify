<template>
  <article>

    <div class="content">
      <h3 class="title is-3">Code comparisons</h3>
      <h4 class="title is-4">Overview</h4>
      <p>This section demonstrates various ways to setup and wire stores and components using:</p>
      <ul>
        <li>Pathify</li>
        <li>Vue compound computed properties</li>
        <li>Vuex helpers.</li>
      </ul>
      <p>There are currently two example sets:</p>
      <ul>
        <li>A <router-link to="/repos">typical</router-link> component, with 4 top-level, and 5 sub-property values, and 5 UI controls</li>
        <li>A <router-link to="/user">large</router-link> component with around 9 top-level properties, and 9 UI controls</li>
      </ul>
      <p>The examples aim to compare Pathify to Vuex, specifically:</p>
      <ul>
        <li>lines of additional store code required to set up full I/O for each store value</li>
        <li>lines of additional view code required to wire a component to a store value</li>
        <li>differences in lines of code for various "best-practice" setups, i.e "getters + actions" vs "state + mutations"</li>
        <li>the amount of different syntax styles needed for each approach</li>
        <li>any UI handler code required to link controls to methods</li>
        <li>handling of special cases like sub-property wiring</li>
      </ul>

      <p>See the </p>
    </div>

  </article>
</template>

<script>

</script>
