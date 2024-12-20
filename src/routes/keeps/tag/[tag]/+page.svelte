<script lang="ts">
  import { globalState } from "$lib/state.svelte";
  import { showPerPage } from "$lib/keeps";
  let { data } = $props();

  import KeepCard from "$lib/components/KeepCard.svelte";
  import Pagination from "$lib/components/Pagination.svelte";

  // Global State
  globalState.pageColor = "quaternary";

  // Page
  const { keeps, tag, page, total } = data;
  let lowerBound = $state(page * showPerPage - (showPerPage - 1) || 1);
  let upperBound = $state(Math.min(page * showPerPage, total));
</script>

<div class="contain keeps-list">
  {#each keeps as keep}
    <KeepCard {keep} />
  {/each}

  <Pagination
    currentPage={page}
    totalKeeps={total}
    path="/keeps/tag/{tag}/page"
  />
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
