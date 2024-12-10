<script>
  let { links } = $props();
</script>

<div class="page-menu">
  <ul>
    {#each links as l}
      <li><a href={l.path}>{l.title}</a></li>
    {/each}
  </ul>
</div>

<style>
</style>
