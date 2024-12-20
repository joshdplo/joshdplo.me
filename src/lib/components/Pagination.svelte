<script lang="ts">
  import { showPerPage } from "$lib/keeps";

  let { currentPage, totalKeeps, path } = $props();

  const isCurrentPage = (page: number) => page === currentPage;
  let pagesAvailable = $state(Math.ceil(totalKeeps / showPerPage));
</script>

{#if pagesAvailable > 1}
  <nav aria-label="Paginated results navigation" class="pagination">
    <ul>
      {#each Array.from({ length: pagesAvailable }, (_, i) => i + 1) as page}
        <li>
          <a href="{path}/{page}" aria-current={isCurrentPage(page)}>
            <span class="sr-only">
              {#if isCurrentPage(page)}
                Current page:
              {:else}
                Go to page
              {/if}
            </span>
            {page}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style>
  ul {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;
  }

  a {
    position: relative;
    display: block;
    padding: 0.25rem;
    line-height: 1;
    text-decoration: none;
  }

  a[aria-current="true"] {
    color: var(--c-black);
    background: var(--c-quaternary);
  }
</style>
