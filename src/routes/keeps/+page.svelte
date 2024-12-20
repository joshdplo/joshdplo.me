<script>
  let { data } = $props();
  import { globalState } from "$lib/state.svelte";
  import KeepCard from "$lib/components/KeepCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  globalState.pageColor = "quaternary";
</script>

<div class="contain keeps-list">
  {#each data.keeps as keep}
    <KeepCard {keep} />
  {/each}
</div>

<div class="contain">
  <Pagination currentPage={1} totalKeeps={data.total} path="/keeps/page" />
</div>

<style>
  .keeps-list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 800px) {
    .keeps-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (max-width: 525px) {
    .keeps-list {
      grid-template-columns: 1fr;
    }
  }
</style>
