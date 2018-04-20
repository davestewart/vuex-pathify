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

      <p>There are currently two sets of comparison files:</p>

      <ul>
        <li>A <strong><router-link to="/code/typical">typical component</router-link></strong> with 4 top-level properties, 5 sub-properties, and some UI control wiring</li>
        <li>A <strong><router-link to="/code/large">large component</router-link></strong> with 9 top-level properties and associated UI control wiring</li>
      </ul>

      <p>Note that each set is <strong>identical</strong> in its presentation and functionality, with the <strong>implementation</strong> differing between examples.</p>

      <h4 class="title is-4">Purpose</h4>
      <p>The aim is to compare Pathify to vanilla JavaScript / Vuex, specifically:</p>

      <ul>
        <li>Lines of code:</li>
        <ul>
          <li>how many syntax or coding styles are required to properly wire each approach?</li>
          <li>how much extra code is required to fully wire sub-properties?</li>
          <li>how many component attributes or handlers are required to wire-up controls?</li>
          <li>is additional formatting required for larger, more complex setups?</li>
        </ul>

        <li>Complexity:</li>
        <ul>
          <li>how many syntax or coding styles are required to properly wire each approach?</li>
          <li>how much extra code is required to fully wire sub-properties?</li>
          <li>how many component attributes or handlers are required to wire-up controls?</li>
          <li>is additional formatting required for larger, more complex setups?</li>
        </ul>
      </ul>

      <p>For each example set:</p>
      <ul>
        <li>an <strong>introduction</strong> outlines aim and setup</li>
        <li>an <strong>analysis</strong> compares:</li>
        <ul>
          <li><strong>approaches</strong> - detailing the interesting points, strengths and weaknesses of each one</li>
          <li><strong>lines of code</strong> - counting only the "doing" code, i.e. computed or actions, and skipping blank lines</li>
          <li><strong>typed characters</strong> - counting only typed characters, so ignoring indent whitespace</li>
          <li><strong>complexity</strong> - counting the amount of different operations or syntax types used</li>
        </ul>
      </ul>


      <h4 class="title is-4">Examples</h4>
      <p>For each example:</p>
      <ul>
        <li>an <strong>introduction sentence</strong> briefly outlines overall setup</li>
        <li>a <strong>button</strong> links to the same component file (if running in CodeSandbox)</li>
        <li>source code <strong>comments</strong> detail implementation specifics</li>
      </ul>

      <p>For the Vuex / Vuex examples:</p>
      <ul>
        <li>The <strong>"light"</strong> examples, Vuex stores use <strong>state and mutations</strong> only</li>
        <li>The <strong>"full"</strong> examples, Vuex stores use additional <strong>getters and actions</strong> (a so-called best-practice, as detailed
          <a href="https://forum.vuejs.org/t/actions-for-actions-sake/16413">here</a>)</li>
      </ul>

    </div>

  </article>
</template>
