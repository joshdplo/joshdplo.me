<script>
  import { globalState } from "$lib/state.svelte";
  import { META } from "$lib/data";

  // Global State
  globalState.pageColor = "secondary";

  // Page State
  let meta = $state(META[0]);
</script>

<svelte:head>
  <meta name="description" content="A summary of the things Josh likes" />
</svelte:head>

<section class="contain">
  <div>Total Movies: {meta.totalMovies}</div>
  <div>Total Shows: {meta.totalShows}</div>
</section>

<style lang="scss">
</style>
