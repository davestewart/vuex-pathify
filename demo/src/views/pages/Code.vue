<template>
  <article>

    <div class="content">
      <h2 class="title is-2">Code comparisons</h2>
      <h4 class="title is-4">Overview</h4>
      <p>This section demonstrates various ways to setup stores and wire components using:</p>
      <ul>
        <li>Pathify only</li>
        <li>Vue compound computed properties</li>
        <li>Vuex helpers</li>
      </ul>
      <p>The aim is to compare Pathify to vanilla JavaScript / Vuex, specifically:</p>
      <ul>
        <li>lines of store code required to set up full I/O for each store property</li>
        <li>lines of view code required to wire a component to a store property</li>
        <li>differences in lines of code for various "best-practice" setups, i.e "getters + actions" over "state + mutations"</li>
        <li>layout and formatting of files, especially where more complex code needs clearer formatting</li>
        <li>the amount of different syntax styles needed for full wiring of each approach</li>
        <li>any UI handler code required to link controls to methods</li>
        <li>handling of sub-property wiring</li>
      </ul>

      <h4 class="title is-4">Examples</h4>
      <p>There are currently two sets of comparison files:</p>
      <ul>
        <li>A <router-link to="/code/typical">"typical"</router-link> component, with 4 top-level properties, 5 sub-properties, and some UI control wiring</li>
        <li>A <router-link to="/code/large">"large"</router-link> component, with 9 top-level properties and associated UI control wiring</li>
      </ul>

      <p>The examples all run <strong>exactly the same</strong>; study the code to see the differences.</p>
      <p>Click <a href="#" @click="showCode">here</a> to open the first file.</p>
    </div>

  </article>
</template>

<script>
  export default {
    methods: {
      showCode () {
        dispatch(actions.editor.openModule('/src/examples/typical/state/pathify.js'));
      }
    }
  }

</script>
