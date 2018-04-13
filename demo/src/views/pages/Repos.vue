<template>
  <article>

    <div class="content">
      <h3 class="title is-3">Typical component example</h3>
      <h4 class="title is-4">Overview</h4>
      <p>This section compares various ways to setup and wire what might be considered a typical component:</p>
      <ul>
        <li>A mix of read and read/write properties</li>
        <li>2 top-level store nodes</li>
        <li>2 sub-property store nodes</li>
      </ul>
      <p>The component loads and renders a list of Github repositories, allowing the user to filter the list using some standard UI controls.</p>
      <p>The various examples compare:</p>
      <ul>
        <li>Ease of store setup</li>
        <li>Amount of store boilerplate required</li>
        <li></li>
      </ul>

      <p>Each of the examples extends from a base store file, and sets up the. See:</p>
      <pre>/store/repos
/views/examples/repos
</pre>
      <p>some of the core features of Pathify, including get and sync functions, direct, wildcard
        and object syntax. See the source code for details.</p>
    </div>

  </article>
</template>

<script>

</script>
