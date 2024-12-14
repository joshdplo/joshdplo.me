<script>
  let { data } = $props();
  import KeepCard from "$lib/components/KeepCard.svelte";
</script>

<section>
  <h1>All Keeps</h1>
  {#each data.keeps as keep}
    <KeepCard {keep} />
  {/each}
</section>
